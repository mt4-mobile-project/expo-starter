import { View, Paragraph } from 'tamagui';
import { Link } from 'expo-router';

export default function MessagesScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Paragraph>Page des Messages</Paragraph>
      <Link href="/envoiunmessage">Tester l'envoi de message</Link>
    </View>
  );
}
