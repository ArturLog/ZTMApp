"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import H1 from "@/components/typography/H1";
import { fetchData } from '@/lib/utils';

const DraggableStopsList = dynamic(
	() =>
		import("@/components/feature/DraggableStopsList").then(
			(mod) => mod.DraggableStopsList
		),
	{ ssr: false }
);

export default function Home() {
	const [allStops, setAllStops] = useState<Stop[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchAllStops = async () => { // TODO: Cache
			try {
				const response = await fetchData("stops/active");
				if (!response || response.status !== 200) {
					throw new Error("Failed to fetch stops");
				}
				const stops = response.data;
				setAllStops(
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

	const filteredStops = allStops.filter((stop) =>
		stop.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4">
			<H1>All stops</H1>
			<Input
				type="text"
				placeholder="Search stops..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mb-6"
			/>
			<DraggableStopsList
				stops={filteredStops}
				onReorder={setAllStops}
			/>
		</div>
	);
}
