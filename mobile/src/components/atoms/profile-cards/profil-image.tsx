import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface ProfileImageProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  source?: string;
}

export default function ProfileImage({
  width = 100,
  height = 100,
  borderRadius = 50,
  borderWidth = 2,
  borderColor = 'transparent',
  source = 'https://picsum.photos/200',
}: ProfileImageProps) {
  const styles = StyleSheet.create({
    image: {
      width,
      height,
      borderRadius,
      borderWidth,
      borderColor,
    },
  });

  return <Image style={styles.image} source={source} contentFit="cover" transition={1000} />;
}
