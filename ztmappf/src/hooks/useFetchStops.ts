"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchData } from "@/lib/utils";
import { Stop } from "@/interfaces";

const stopCache: { allStops: Stop[] | null; timestamp: number } = {
  allStops: null,
  timestamp: 0,
};

export function useFetchStops() {
  const [allStops, setAllStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllStops = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cacheExpiry = 10 * 60 * 1000; // 10 minutes in milliseconds
    if (stopCache.allStops && Date.now() - stopCache.timestamp < cacheExpiry) {
      setAllStops(stopCache.allStops);
      setLoading(false);
      return;
    }
    try {
      const response = await fetchData("stops/active");
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch stops");
      }
      const stops = response.data;
      const mappedStops = stops.map((stop: any) => ({
          id: stop.id,
          stopId: stop.stopId,
          name: stop.name,
          stopCode: stop.stopCode,
          type: stop.type,
          zone: stop.zone,
          departures: [],
        }));
      // Cache the stops data
      stopCache.allStops = mappedStops;
      stopCache.timestamp = Date.now();

      setAllStops(mappedStops);
    } catch (error: any) {
      console.error("Error fetching stops:", error);
      setError(error.message || "An error occurred while fetching stops");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllStops();
  }, [fetchAllStops]);

  return { allStops, setAllStops, loading, error, refreshStops: fetchAllStops };
}
