"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import H1 from "@/components/typography/H1";
import { useFetchStops } from "@/hooks/useFetchStops";

const DraggableStopsList = dynamic(
	() =>
		import("@/components/feature/DraggableStopsList").then(
			(mod) => mod.DraggableStopsList
		),
	{ ssr: false }
);

export default function Home() {
	const { allStops, setAllStops, loading, error } = useFetchStops();
	const [searchTerm, setSearchTerm] = useState("");

	const filteredStops = allStops.filter((stop) =>
		stop.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
