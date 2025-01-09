'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'

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

const DraggableAllStopsList = dynamic(() => import('../../src/components/DraggableAllStopsList').then(mod => mod.DraggableAllStopsList), { ssr: false })

export default function Home() {
  const [allStops, setAllStops] = useState<BusStop[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulating fetching all stops from backend
    const fetchAllStops = async () => {
      // In a real app, this would be an API call
      const mockAllStops: BusStop[] = [
        { id: '1', name: 'Central Station', buses: [
            { number: '101', direction: 'Downtown', departureIn: 5 },
            { number: '202', direction: 'Airport', departureIn: 12 },
            { number: '303', direction: 'University', departureIn: 18 },
          ]},
        { id: '2', name: 'Market Square', buses: [
            { number: '101', direction: 'Suburbs', departureIn: 3 },
            { number: '404', direction: 'Shopping Mall', departureIn: 8 },
          ]},
        { id: '3', name: 'City Park', buses: [
            { number: '505', direction: 'Beach', departureIn: 15 },
            { number: '606', direction: 'Stadium', departureIn: 22 },
          ]},
      ]
      setAllStops(mockAllStops)
    }

    fetchAllStops()
  }, [])

  const filteredStops = allStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Bus Stops</h1>
      <Input
        type="text"
        placeholder="Search bus stops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <DraggableAllStopsList stops={filteredStops} onReorder={setAllStops} />
    </div>
  )
}

