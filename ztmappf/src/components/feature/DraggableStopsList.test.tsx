import { render, screen } from '@testing-library/react';
import { DraggableStopsList } from '@/components/feature/DraggableStopsList';

const stops = [
  { id: '1', name: 'Stop A', stopCode: '100A', type: 'bus', zone: '1', departures: [] },
  { id: '2', name: 'Stop B', stopCode: '101B', type: 'tram', zone: '2', departures: [] },
];

describe('DraggableStopsList', () => {
  it('should render the list of stops', () => {
    render(<DraggableStopsList stops={stops} onReorder={jest.fn()} />);

    expect(screen.getByText('Stop A')).toBeInTheDocument();
    expect(screen.getByText('Stop B')).toBeInTheDocument();
  });

  it('should display zone and stopCode for each stop', () => {
    render(<DraggableStopsList stops={stops} onReorder={jest.fn()} />);

    expect(screen.getByText('1 - Stop A - 100A - bus')).toBeInTheDocument();
    expect(screen.getByText('2 - Stop B - 101B - tram')).toBeInTheDocument();
  });
});
