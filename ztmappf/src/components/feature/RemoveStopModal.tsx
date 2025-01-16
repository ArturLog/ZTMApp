'use client'

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {useFetchMyStops} from "@/hooks/useFetchMyStops";
import { fetchData } from '@/lib/utils';
import { useAuth } from "@/hooks/useAuth";
import { Stop } from '@/interfaces/Stop';

interface RemoveStopModalProps {
  isOpen: boolean;
  refreshStops: () => void;
  onClose: () => void;
}

export function RemoveStopModal({ isOpen, refreshStops, onClose }: RemoveStopModalProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('')
  const { myStops, refreshMyStops } = useFetchMyStops();

  const filteredStops = myStops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRemoveStop = async (stop: Stop) => {
    try {
          const response = await fetchData(`users/${user.id}/stops/${stop.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    } catch (error) {
          console.error("Delete stop failed:", error);
          throw error;
    }
    refreshStops();
    onClose();
  }

  useEffect(() => {
    refreshMyStops();
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove a stop</DialogTitle>
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
                <Button onClick={() => handleRemoveStop(stop)} size="sm" variant={"destructive"}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

