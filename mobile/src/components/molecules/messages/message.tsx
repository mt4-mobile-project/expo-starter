import { Alert } from 'react-native';
import { View } from 'tamagui';
import { Text } from '@/components/atoms/typography/text';

interface MessageProps {
  id: number;
  content: string;
  date: string;
  whoAreYou: string;
  onModify?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
}

const Message: React.FC<MessageProps> = ({ id, content, date, whoAreYou, onModify, onDelete }) => {
  const isSender = whoAreYou === 'sender';

  const handleLongPress = () => {
    Alert.alert('Options', 'Que souhaitez-vous faire avec ce message ?', [
      {
        text: 'Modifier',
        onPress: () => onModify && onModify(id, content),
      },
      {
        text: 'Supprimer',
        onPress: () => {
          onDelete && onDelete(id);
          console.log('Supprimé');
        },
        style: 'destructive',
      },
      {
        text: 'Annuler',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View marginVertical="$5">
      <View
        justifyContent="flex-start"
        padding="$4"
        width="70%"
        borderRadius="$lg"
        backgroundColor={isSender ? '$info' : '$border'}
        alignSelf={isSender ? 'flex-end' : 'flex-start'}
        onLongPress={handleLongPress}
      >
        <Text>{content}</Text>
        <View marginTop="$4" justifyContent="flex-end" width="100%" flexDirection="row">
          <Text size="xs">{date}</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;
