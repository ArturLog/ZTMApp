'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { fetchData } from '@/lib/utils';

interface DraggableAllStopsListProps {
  stops: Stop[];
  onReorder: (newOrder: Stop[]) => void;
}

export function DraggableStopsList({ stops, onReorder }: DraggableAllStopsListProps) {
  const [expandedStopId, setExpandedStopId] = useState<string | null>(null);
  const [loadingBuses, setLoadingBuses] = useState<boolean>(false);

  const fetchDepartures = async (stopId: string) => { // TODO: Cache
    try {
      setLoadingBuses(true);
      const response = await fetchData(`departures/${stopId}`);
      if (!response || response.status !== 200) {
        return [];
      }
      const departures = response.data;
      return departures.map((Departure: any) => ({
        routeId: Departure.routeId,
        headSign: Departure.headSign,
        minutesToDeparture: Departure.minutesToDeparture,
        estimatedTime: Departure.estimatedTime,
      }));
    } catch (error) {
      console.error('Error fetching departures:', error);
      return [];
    } finally {
      setLoadingBuses(false);
    }
  };

  const handleAccordionChange = async (stopId: string) => {
    if (expandedStopId === stopId) {
      setExpandedStopId(null);
    } else {
      const stopIndex = stops.findIndex((stop) => stop.stopId === stopId);
      if (stopIndex !== -1 && stops[stopIndex].departures.length === 0) {
        // Fetch departures only if they haven't been loaded yet
        const departures = await fetchDepartures(stopId);
        const updatedStops = [...stops];
        updatedStops[stopIndex].departures = departures;
        onReorder(updatedStops);
      }
      setExpandedStopId(stopId);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(stops);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="allStops" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {stops.map((stop, index) => (
              <Draggable key={stop.stopId} draggableId={stop.stopId} index={index} isDragDisabled={true}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Accordion type="single" collapsible className="bg-card rounded-lg shadow-sm">
                      <AccordionItem value={stop.stopId}>
                        <AccordionTrigger
                          className="px-4 py-3 hover:bg-muted/50 rounded-t-lg gap-4"
                          onClick={() => handleAccordionChange(stop.stopId)}
                        >
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{stop.zone} - {stop.name} - {stop.stopCode} - {stop.type}</span>
                            <span className="text-muted-foreground">Stop number {stop.stopId}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                          {loadingBuses && expandedStopId === stop.stopId ? (
                            <p>Loading departures...</p>
                          ) : (
                            <ul className="space-y-2">
                              {stop.departures.map((Departure, busIndex) => (
                                <li key={busIndex}
                                    className="flex justify-between items-center py-2 border-b last:border-b-0">
                                  <div>
                                    <span className="font-semibold mr-2">{Departure.routeId}</span>
                                    <span className="text-muted-foreground">{Departure.headSign}</span>
                                  </div>
                                  <span className="text-green-600 font-medium">
                                    {Departure.estimatedTime} - {Departure.minutesToDeparture} min
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
