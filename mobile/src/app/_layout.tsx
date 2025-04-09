import { useFonts } from 'expo-font';
import { Stack, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const newSocket = new SockJS(`${API_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => newSocket,
      reconnectDelay: 5000, // auto-reconnect
      onConnect: () => {
        console.log('✅ Connected to STOMP');
        const token =
          'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3NDQyMDkzNDksImV4cCI6MTc0NDI5NTc0OX0.Pp24gKgr4390o0yHfjkia5q2BtskKTdJ5ZGbi09UXq5N0_0jJWtSu9ccT9Gld1SJ';

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        stompClient.subscribe(
          `/topic/room.1`,
          (message) => {
            console.log('📥 Reçu du WS :', message);
          },
          headers
        );
      },
      onStompError: (frame) => {
        console.error('💥 STOMP Error:', frame);
      },
    });

    stompClient.activate(); // C'est ça qui fait la magie

    setSocket(stompClient);

    return () => {
      stompClient.deactivate();
      newSocket.close();
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
