module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./mobile'],
          alias: {
            '@components': './mobile/components',
            '@atoms': './mobile/components/atoms',
            '@molecules': './mobile/components/molecules',
            '@organisms': './mobile/components/organisms',
            '@layout': './mobile/components/layout',
            '@pages': './mobile/components/pages',
            '@assets': './mobile/assets',
            '@hooks': './mobile/hooks',
            '@utils': './mobile/utils',
            '@store': './mobile/store',
            '@services': './mobile/services',
            '@api': './mobile/api',
            '@app': './mobile/app'
          }
        }
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        }
      ],
      'expo-router/babel',
      'react-native-reanimated/plugin'
    ]
  };
};