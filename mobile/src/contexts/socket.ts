import { createContext } from 'react';
import { Client } from '@stomp/stompjs';

export const SocketContext = createContext<Client | null>(null);
