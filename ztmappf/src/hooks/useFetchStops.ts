import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/utils";
import { Stop } from '@/interfaces/Stop';

const fetchStops = async (): Promise<Stop[]> => {
  const response = await fetchData("stops/active");
  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch stops");
  }

  return response.data.map((stop: any) => ({
    id: stop.id,
    stopId: stop.stopId,
    name: stop.name,
    stopCode: stop.stopCode,
    type: stop.type,
    zone: stop.zone,
    departures: [],
  }));
};

export function useFetchStops() {
  const { data: allStops = [], isLoading, error, refetch: refreshStops } = useQuery({
    queryKey: ["allStops"],
    queryFn: fetchStops,
    staleTime: 10 * 60 * 1000, // Cache time (10 minutes)
  });

  return { allStops, loading: isLoading, error, refreshStops };
}
