module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './components',
            '@atoms': './components/atoms',
            '@molecules': './components/molecules',
            '@organisms': './components/organisms',
            '@layout': './components/layout',
            '@pages': './components/pages',
            '@assets': './assets',
            '@hooks': './hooks',
            '@utils': './utils',
            '@store': './store',
            '@services': './services',
            '@api': './api',
            '@app': './app',
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
