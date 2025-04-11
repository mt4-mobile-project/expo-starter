import { useState } from 'react';
import type { Event } from '@/types/events';

export const useEventFilters = (events: Event[] = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'title' | 'date' | 'address'>('title');

  const filteredEvents = events.filter((event) => {
    const lowerSearch = searchTerm.toLowerCase();

    switch (activeFilter) {
      case 'title':
        return event.name.toLowerCase().includes(lowerSearch);
      case 'date':
        return event.start_date.toLowerCase().includes(lowerSearch);
      case 'address':
        return `${event.address.street}, ${event.address.city}`.toLowerCase().includes(lowerSearch);
      default:
        return true;
    }
  });

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    filteredEvents,
  };
};
