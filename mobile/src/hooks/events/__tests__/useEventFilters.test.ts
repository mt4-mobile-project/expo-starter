import { renderHook } from '@testing-library/react-hooks';
import { useEventFilters } from '../useEventFilters';
import type { Event } from '@/types/events';

const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Concert Rock',
    description: 'Rock concert description',
    start_date: '2023-12-25',
    end_date: '2023-12-26',
    user_id: 1,
    address: {
      id: 1,
      street: '123 Main St',
      city: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },
  {
    id: 2,
    name: 'Festival Jazz',
    description: 'Jazz festival description',
    start_date: '2023-11-15',
    end_date: '2023-11-16',
    user_id: 2,
    address: {
      id: 2,
      street: '456 Elm St',
      city: 'Lyon',
      latitude: 45.764,
      longitude: 4.8357,
    },
  },
];

describe('useEventFilters', () => {
  it('should filter events by title', () => {
    const { result } = renderHook(() => useEventFilters(mockEvents));

    // Set search term and filter
    result.current.setSearchTerm('rock');
    result.current.setActiveFilter('title');

    expect(result.current.filteredEvents).toEqual([mockEvents[0]]);
  });

  it('should filter events by date', () => {
    const { result } = renderHook(() => useEventFilters(mockEvents));

    result.current.setSearchTerm('2023-11');
    result.current.setActiveFilter('date');

    expect(result.current.filteredEvents).toEqual([mockEvents[1]]);
  });

  it('should filter events by address', () => {
    const { result } = renderHook(() => useEventFilters(mockEvents));

    result.current.setSearchTerm('lyon');
    result.current.setActiveFilter('address');

    expect(result.current.filteredEvents).toEqual([mockEvents[1]]);
  });

  it('should return all events when search term is empty', () => {
    const { result } = renderHook(() => useEventFilters(mockEvents));

    result.current.setSearchTerm('');

    expect(result.current.filteredEvents).toEqual(mockEvents);
  });
});
