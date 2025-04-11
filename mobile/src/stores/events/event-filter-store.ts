import { create } from 'zustand';
import type { Event } from '@/types/events';

interface EventFilterState {
  searchTerm: string;
  activeFilter: 'title' | 'date' | 'address';
  setSearchTerm: (term: string) => void;
  setActiveFilter: (filter: 'title' | 'date' | 'address') => void;
  getFilteredEvents: (events: Event[]) => Event[];
}

export const useEventFilterStore = create<EventFilterState>((set, get) => ({
  searchTerm: '',
  activeFilter: 'title',

  setSearchTerm: (term) => set({ searchTerm: term }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  getFilteredEvents: (events) => {
    const { searchTerm, activeFilter } = get();

    if (!searchTerm.trim()) return events;

    const lowerSearch = searchTerm.toLowerCase();

    return events.filter((event) => {
      switch (activeFilter) {
        case 'title':
          return event.name.toLowerCase().includes(lowerSearch);
        case 'date':
          return event.start_date.toLowerCase().includes(lowerSearch);
        case 'address':
          return `${event.address.street}, ${event.address.city}`
            .toLowerCase()
            .includes(lowerSearch);
        default:
          return true;
      }
    });
  },
}));
