import { Link } from 'expo-router';
import { View } from 'tamagui';

export default function HomeScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 567890 },
        }}
      >
        View event 567890 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 2 },
        }}
      >
        View event 2 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/event/[id]',
          params: { id: 97661 },
        }}
      >
        View event 97661 (id in params in href)
      </Link>

      <Link
        href={{
          pathname: '/vitoexample',
        }}
      >
        View Vito example page
      </Link>
    </View>
  );
}
