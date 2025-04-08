import { View, Paragraph } from 'tamagui';

export default function VitoExampleScreen() {
  return (
    <View
      flex={1}
      backgroundColor="$background"
      padding="$4"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Paragraph>Vito example Router page</Paragraph>
    </View>
  );
}
