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
import { SocketContext } from '@/contexts/socket';
import { API_URL } from '@/utils/api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { asyncStorageToken } from '@/utils/asyncStorageToken';
import { useCheckAuth } from '@/hooks/auth/useCheckAuth';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [socket, setSocket] = useState<Client | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loaded] = useFonts({});
  useCheckAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await asyncStorageToken.get();
      setToken(storedToken);
    }

    fetchToken();

    if (!token) return;

    stompClient.current = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws`),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('Connecté au serveur WebSocket');

        setSocket(stompClient.current);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Stack.Screen name="index" />
              <Stack.Screen
                name="auth/login"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="auth/register"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="/create-profile" options={{ title: 'Créer votre profil' }} />
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
