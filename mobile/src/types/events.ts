export interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  user_id: number;
  image?: string;
  isJoined?: boolean; // Add this line
  address: {
    id: number;
    street: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}
