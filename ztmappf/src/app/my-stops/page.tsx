'use client'

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { AddStopModal } from '@/components/AddStopModal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';

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

const DraggableStopList = dynamic(() => import('@/components/DraggableStopList').then(mod => mod.DraggableStopList), { ssr: false })

export default function MyStops() {
  const [myStops, setMyStops] = useState<BusStop[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const router = useRouter();


  useEffect(() => {
    // Simulating fetching user's stops from backend
    const fetchMyStops = async () => {
      // In a real app, this would be an API call
      const mockUserStops: BusStop[] = [
        { id: '1', name: 'My Home Stop', buses: [
            { number: '101', direction: 'Downtown', departureIn: 5 },
            { number: '202', direction: 'Airport', departureIn: 12 },
          ]},
        { id: '2', name: 'Work Stop', buses: [
            { number: '303', direction: 'University', departureIn: 8 },
          ]},
      ]
      setMyStops(mockUserStops)
    }

    fetchMyStops()
  }, [])


  const addStop = (newStop: BusStop) => {
    setMyStops([...myStops, newStop])
    // In a real app, you'd also save this to the backend
  }

  const filteredStops = myStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      <DraggableStopList stops={filteredStops} onReorder={setMyStops} />
      <AddStopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStop={addStop}
      />
    </div>
  )
}

