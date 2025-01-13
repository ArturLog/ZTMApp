'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'

const DraggableAllStopsList = dynamic(
  () =>
    import('@/components/feature/DraggableAllStopsList').then(
      mod => mod.DraggableAllStopsList
    ),
  { ssr: false }
)

export default function Home() {
  const [allStops, setAllStops] = useState<Stop[]>([])
  const [searchTerm, setSearchTerm] = useState('')

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
        setAllStops(
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

  const filteredStops = allStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All stops</h1>
      <Input
        type="text"
        placeholder="Search stops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <DraggableAllStopsList stops={filteredStops} onReorder={setAllStops} />
    </div>
  )
}

