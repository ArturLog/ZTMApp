interface Stop {
  id: string;
  name: string;
  stopCode: string;
  zone: string;
  type: string;
  departures: Departure[];
}