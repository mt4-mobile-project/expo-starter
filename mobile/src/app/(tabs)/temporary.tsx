import { Link } from 'expo-router';
import { View } from 'tamagui';

export default function TemporaryScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <Link
        href={{
          pathname: '/temporary/form',
        }}
      >
        Temporary Form page
      </Link>
    </View>
  );
}
