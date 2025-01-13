'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { AddStopModal } from '@/components/feature/AddStopModal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { DraggableAllStopsList } from '@/components/feature/DraggableAllStopsList';

const DraggableStopList = dynamic(() => import('@/components/feature/DraggableStopList').then(mod => mod.DraggableStopList), { ssr: false })

export default function MyStops() {
  const [myStops, setMyStops] = useState<Stop[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const router = useRouter();


  // useEffect(() => {
  //   // Simulating fetching user's stops from backend
  //   const fetchMyStops = async () => {
  //     // In a real app, this would be an API call
  //     const mockUserStops: BusStop[] = [
  //       { id: '1', name: 'My Home Stop', buses: [
  //           { number: '101', direction: 'Downtown', departureIn: 5 },
  //           { number: '202', direction: 'Airport', departureIn: 12 },
  //         ]},
  //       { id: '2', name: 'Work Stop', buses: [
  //           { number: '303', direction: 'University', departureIn: 8 },
  //         ]},
  //     ]
  //     setMyStops(mockUserStops)
  //   }
  //
  //   fetchMyStops()
  // }, [])
  //
  //
  const addStop = (newStop: Stop) => {
    setMyStops([...myStops, newStop])
    // In a real app, you'd also save this to the backend
  }

  const filteredStops = myStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchAllStops = async () => {
      try {
        const response = await fetch('http://localhost:3001/stops/active', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stops');
        }
        const stops = await response.json();
        setMyStops(
          stops.map((stop: any) => ({
            id: String(stop.id),
            name: stop.name,
            stopCode: stop.stopCode,
            type: stop.type,
            zone: stop.zone,
            departures: [],
          })),
        );
      } catch (error) {
        console.error('Error fetching stops:', error);
      }
    };

    fetchAllStops()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Stops</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Stop
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search my stops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <DraggableAllStopsList stops={filteredStops} onReorder={setMyStops} />
      <AddStopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStop={addStop}
      />
    </div>
  )
}

