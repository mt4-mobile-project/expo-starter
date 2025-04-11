export interface Room {
    id: string;
    participant: {
      id: string;
      name: string;
      avatar: string;
    };
    last_message: {
      content: string;
      sent_at: string; 
      senderId: string;
    };
}
  