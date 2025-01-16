"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {Trash} from "lucide-react";
import { AddStopModal } from "@/components/feature/AddStopModal";
import { RemoveStopModal } from "@/components/feature/RemoveStopModal";
import { useRouter } from "next/navigation";
import H1 from "@/components/typography/H1";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { fetchData } from "@/lib/utils";
import {useFetchMyStops} from "@/hooks/useFetchMyStops";

// dynamic import of DraggableStopsList
const DraggableStopsList = dynamic(
  () =>
    import("@/components/feature/DraggableStopsList").then(
      (mod) => mod.DraggableStopsList
    ),
  { ssr: false }
);

export default function MyStops({ params: paramsPromise }: { params: Promise<{ userId: string }> }) {
  const { isLoggedIn, user, checkAuth, logout } = useAuth();
//   const [myStops, setMyStops] = useState<Stop[]>([]);
    const { myStops, setMyStops, refreshMyStops  } = useFetchMyStops();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const router = useRouter();

  const [params, setParams] = useState<{ userId: string } | null>(null);

  useEffect(() => {
    paramsPromise.then((unwrappedParams) => setParams(unwrappedParams));
  }, [paramsPromise]);

//   useEffect(() => {
//     if (!params) return;
//
//     const fetchAllStops = async () => {
//       try {
//         const response = await fetchData(`users/${params.userId}/stops`);
//         if (!response || response.status !== 200) {
//           throw new Error("Failed to fetch stops");
//         }
//         const stops = await response.data;
//         setMyStops(
//           stops.map((stop: any) => ({
//             id: stop.id,
//             stopId: String(stop.stopId),
//             name: stop.name,
//             stopCode: stop.stopCode,
//             type: stop.type,
//             zone: stop.zone,
//             departures: [],
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching stops:", error);
//       }
//     };
//
//     fetchAllStops();
//   }, [params]);

  const filteredStops = myStops.filter((stop) =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshStops = () => {
    refreshMyStops();
  }

  if (!params || !myStops) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <H1>My Stops</H1>
        <div className="flex items-center gap-2">
            <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2"
            >
                <PlusCircle size={24} />
                Add Stop
            </Button>
            <Button
                onClick={() => setIsRemoveModalOpen(true)}
                className="flex items-center gap-2"
                variant={"destructive"}
            >
                <Trash size={24} />
                Remove Stop
            </Button>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Search my stops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <DraggableStopsList stops={filteredStops} onReorder={setMyStops} />
      <AddStopModal
        isOpen={isAddModalOpen}
        refreshStops={refreshStops}
        onClose={() => setIsAddModalOpen(false)}
      />
      <RemoveStopModal
        isOpen={isRemoveModalOpen}
        refreshStops={refreshStops}
        onClose={() => setIsRemoveModalOpen(false)}/>
    </div>
  );
}
