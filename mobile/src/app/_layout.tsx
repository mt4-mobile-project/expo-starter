import { useFonts } from 'expo-font';
import { Stack, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider, Theme, View } from 'tamagui';
import config from '@/configs/tamagui.config';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconButton } from '@/components/atoms/buttons/icon-button';
import { SocketContext } from '@/context/socket';
import { API_URL } from '@/utils/api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [socket, setSocket] = useState<Client | null>(null);
  const [loaded] = useFonts({});

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const stompClient = useRef<Client | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const token =
    'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3NDQyODgxNjAsImV4cCI6MTc0NDM3NDU2MH0.q0Lun19__832gawO4JCMo9a1vJChhCpsfvO5CDHgWY-0iUUVZBfPuT4sQMlHp_lW';

  useEffect(() => {
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('Connecté au serveur WebSocket');

        setSocket(stompClient.current);

        // TODO code exemple pour gérer la réception de message
        // stompClient.current?.subscribe(
        //   `/topic/room.1`,
        //   (message) => {
        //     console.log('📩 Message reçu:', message);
        //     const msg = JSON.parse(message.body);
        //     setMessages((prev) => [...prev, msg]);
        //   },
        //   {
        //     Authorization: `Bearer ${token}`,
        //   }
        // );
      },
      onStompError: (frame) => {
        console.error('❌ Erreur STOMP:', frame.headers['message']);
        console.error('Détails:', frame.body);
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, []);

  if (!loaded) return null;

  const HeaderRight = () => (
    <View flexDirection="row">
      <IconButton variant="bottomless">
        <Link href="/messages">
          <MaterialIcons name="message" size={24} color="black" />
        </Link>
      </IconButton>
      <IconButton variant="bottomless">
        <Link href="/notifications">
          <MaterialIcons name="notifications-active" size={24} color="black" />
        </Link>
      </IconButton>
    </View>
  );

  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
          <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
            <Stack screenOptions={{ headerRight: () => <HeaderRight /> }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}
