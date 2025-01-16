'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFetchStops } from "@/hooks/useFetchStops";
import { fetchData } from '@/lib/utils';
import { useAuth } from "@/hooks/useAuth";
import { Stop } from '@/interfaces/Stop';

interface AddStopModalProps {
  isOpen: boolean;
  refreshStops: () => void;
  onClose: () => void;
}

export function AddStopModal({ isOpen, refreshStops, onClose }: AddStopModalProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('')
  const { allStops } = useFetchStops();

  const filteredStops = allStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddStop = async (stop: Stop) => {
    try {
      const response = await fetchData(`users/${user.id}/stops/${stop.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Add stop failed:", error);
      throw error;
    }
    refreshStops();
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
                <span>{stop.name} - {stop.stopCode} - {stop.type}</span>
                <Button onClick={() => handleAddStop(stop)} size="sm">Add</Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

