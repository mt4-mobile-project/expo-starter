import { useFonts } from 'expo-font';
import { Stack, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider, Theme, View } from 'tamagui';
import config from '@/configs/tamagui.config';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { IconButton } from '@/components/atoms/buttons/icon-button';
import { useCheckAuth } from '@/hooks/useCheckAuth';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({});
  useCheckAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const HeaderRight = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
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
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack
            screenOptions={{
              headerShown: false 
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
