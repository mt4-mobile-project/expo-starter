import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  source: string;
  onPress?: () => void;
}

export default function ProfileImage({
  width = 100,
  height = 100,
  borderRadius = 50,
  borderWidth = 2,
  borderColor = 'transparent',
  source,
  onPress,
}: ProfileImageProps) {
  const styles = StyleSheet.create({
    image: {
      width,
      height,
      borderRadius,
      borderWidth,
      borderColor,
    },
    icon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 4,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: source.startsWith('data:') ? source : source }}
        contentFit="cover"
        transition={1000}
      />
      {onPress && (
        <MaterialCommunityIcons name="pencil" size={20} color="black" style={styles.icon} />
      )}
    </TouchableOpacity>
  );
}
