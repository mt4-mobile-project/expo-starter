import { XStack } from 'tamagui';
import { Button } from '@/components/atoms/buttons/button'; // Utilisation de l'atome personnalisé

interface ConfirmationButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export const ConfirmationButtons: React.FC<ConfirmationButtonsProps> = ({ onCancel, onSubmit }) => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginTop="$4"
      width="100%"
    >
      <Button
        variant="outline" 
        size="lg"
        onPress={onCancel}
        flex={1}
        marginRight="$2"
        height={50}
      >
        Annuler
      </Button>
      <Button
        variant="default" 
        size="lg"
        onPress={onSubmit}
        flex={1}
        marginLeft="$2"
        height={50}
      >
        Valider
      </Button>
    </XStack>
  );
};

export default ConfirmationButtons;