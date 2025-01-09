'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

interface AddStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStop: (stop: BusStop) => void;
}

// Mock data for available stops
const availableStops: BusStop[] = [
  { id: '1', name: 'Central Station', buses: [] },
  { id: '2', name: 'Market Square', buses: [] },
  { id: '3', name: 'City Park', buses: [] },
  { id: '4', name: 'University', buses: [] },
  { id: '5', name: 'Shopping Mall', buses: [] },
]

export function AddStopModal({ isOpen, onClose, onAddStop }: AddStopModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStops = availableStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddStop = (stop: BusStop) => {
    onAddStop(stop)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new stop</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="text"
            placeholder="Search stops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {filteredStops.map((stop) => (
              <li key={stop.id} className="flex justify-between items-center p-2 hover:bg-muted rounded-lg">
                <span>{stop.name}</span>
                <Button onClick={() => handleAddStop(stop)} size="sm">Add</Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

