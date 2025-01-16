import { Departure } from '@/interfaces/Departure';

export interface Stop {
  id: number;
  stopId: string;
  name: string;
  stopCode: string;
  zone: string;
  type: string;
  departures: Departure[];
}