import { View, Paragraph } from 'tamagui';

export default function TemporaryFormScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Paragraph>Form</Paragraph>
    </View>
  );
}
