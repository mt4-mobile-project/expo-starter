export interface EventAddress {
  id: number;
  street: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  user_id: number;
  address: EventAddress;
}
