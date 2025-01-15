"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddStopModal } from "@/components/feature/AddStopModal";
import { useRouter } from "next/navigation";
import H1 from "@/components/typography/H1";
import dynamic from 'next/dynamic';
import { fetchData } from '@/lib/utils';

const DraggableStopsList = dynamic(
	() =>
		import("@/components/feature/DraggableStopsList").then(
			(mod) => mod.DraggableStopsList
		),
	{ ssr: false }
);

export default function MyStops() {
	const [myStops, setMyStops] = useState<Stop[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const router = useRouter();

	const addStop = (newStop: Stop) => {
		setMyStops([...myStops, newStop]);
		// In a real app, you'd also save this to the backend
	};

	const filteredStops = myStops.filter((stop) =>
		stop.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		const fetchAllStops = async () => { // TODO: Fetch only user stops
			try {
				const response = await fetchData("stops/active");
				if (!response || response.status !== 200) {
					throw new Error("Failed to fetch stops");
				}
				const stops = await response.data;
				setMyStops(
					stops.map((stop: any) => ({
						id: String(stop.id),
						name: stop.name,
						stopCode: stop.stopCode,
						type: stop.type,
						zone: stop.zone,
						departures: [],
					}))
				);
			} catch (error) {
				console.error("Error fetching stops:", error);
			}
		};

		fetchAllStops();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<H1>My Stops</H1>
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
			<DraggableStopsList
				stops={filteredStops}
				onReorder={setMyStops}
			/>
			<AddStopModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onAddStop={addStop} // TODO Update add stop
			/>
		</div>
	);
}
