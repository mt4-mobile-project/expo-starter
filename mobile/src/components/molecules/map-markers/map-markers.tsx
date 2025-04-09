import { Marker } from 'react-native-maps';
import { Event } from '@/types/events';

interface MapMarkersProps {
  events: Event[];
  selectedEvent: Event | null;
  userLocation: { latitude: number; longitude: number };
  onMarkerPress: (event: Event) => void;
}

export const MapMarkers = ({
  events,
  selectedEvent,
  userLocation,
  onMarkerPress,
}: MapMarkersProps) => {
  return (
    <>
      <Marker
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        title="Ma position"
        pinColor="blue"
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.address.latitude,
            longitude: event.address.longitude,
          }}
          title={event.name}
          description={`${event.address.street}, ${event.address.city}`}
          pinColor={selectedEvent?.id === event.id ? 'green' : 'red'}
          onPress={() => onMarkerPress(event)}
        />
      ))}
    </>
  );
};
