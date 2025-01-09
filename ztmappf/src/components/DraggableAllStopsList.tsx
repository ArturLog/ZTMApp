'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Bus {
  number: string;
  direction: string;
  departureIn: number;
}

interface BusStop {
  id: string;
  name: string;
  buses: Bus[];
}

interface DraggableAllStopsListProps {
  stops: BusStop[];
  onReorder: (newOrder: BusStop[]) => void;
}

export function DraggableAllStopsList({ stops, onReorder }: DraggableAllStopsListProps) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(stops)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorder(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="allStops" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {stops.map((stop, index) => (
              <Draggable key={stop.id} draggableId={stop.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Accordion type="single" collapsible className="bg-card rounded-lg shadow-sm">
                      <AccordionItem value={stop.id}>
                        <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 rounded-t-lg">
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{stop.name}</span>
                            <span className="text-muted-foreground">ID: {stop.id}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                          <ul className="space-y-2">
                            {stop.buses.sort((a, b) => a.departureIn - b.departureIn).map((bus, busIndex) => (
                              <li key={busIndex} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                <div>
                                  <span className="font-semibold mr-2">Bus {bus.number}</span>
                                  <span className="text-muted-foreground">{bus.direction}</span>
                                </div>
                                <span className="text-green-600 font-medium">
                                  {bus.departureIn} min
                                </span>
                              </li>
                            ))}
                          </ul>
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
  )
}

