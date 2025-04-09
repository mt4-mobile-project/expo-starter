import { useState } from 'react';
import type { Event } from '@/types/events';

export const useEventFilters = (events: Event[] = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'date' | 'address'>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSelectedDate(null);
    setSelectedAddress(null);
  };

  const filteredEvents = events.filter((event) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchSearch =
      event.name.toLowerCase().includes(lowerSearch) ||
      event.address.city.toLowerCase().includes(lowerSearch);
    const matchDate = !selectedDate || event.start_date.startsWith(selectedDate);
    const matchAddress =
      !selectedAddress ||
      `${event.address.street}, ${event.address.city}`
        .toLowerCase()
        .includes(selectedAddress.toLowerCase());

    if (activeFilter === 'date') return matchDate && matchSearch;
    if (activeFilter === 'address') return matchAddress && matchSearch;
    return matchSearch;
  });

  return {
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    selectedDate,
    setSelectedDate,
    selectedAddress,
    setSelectedAddress,
    filteredEvents,
    handleResetFilters,
  };
};
