import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { createTamagui } from 'tamagui';
import { tokens } from '@/theme/tokens';
import { allThemes } from '@/theme/themes';
import { media } from '@/theme/media';

// Create our custom font
const interFont = createInterFont();

// Create the Tamagui config
const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    body: interFont,
    heading: interFont,
  },
  tokens,
  themes: allThemes,
  shorthands,
  media,
});

// Export the config directly as default
export default config;

// For type safety
export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
