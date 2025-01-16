"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchData } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Stop } from "@/interfaces/Stop";

export function useFetchMyStops() {
  const { user } = useAuth();
  const [myStops, setMyStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMyStops = useCallback(async () => {
    setLoading(true);
    setError("");
    if(!user) return null;
    try {
      const response = await fetchData(`users/${user.id}/stops`);
      if (!response || response.status !== 200) {
        return;
      }
      const stops = await response.data;
      setMyStops(stops.map((stop: any) => ({
                id: stop.id,
                stopId: String(stop.stopId),
                name: stop.name,
                stopCode: stop.stopCode,
                type: stop.type,
                zone: stop.zone,
                departures: [],
              }))
            );
          } catch (error: any) {
            console.error("Error fetching stops:", error);
      setError(error.message || "An error occurred while fetching stops");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyStops();
  }, [fetchMyStops]);

  return { myStops, setMyStops, loading, error, refreshMyStops: fetchMyStops };
}
