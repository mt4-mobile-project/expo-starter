import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { createTamagui } from 'tamagui';
import { tokens } from '@/themes/tokens';
import { allThemes } from '@/themes/theme';
import { media } from '@/themes/media';

const interFont = createInterFont();

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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
