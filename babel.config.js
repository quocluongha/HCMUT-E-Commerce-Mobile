module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          i18n: './src/i18n',
          navigation: './src/navigation',
          screens: './src/screens',
          services: './src/services',
          store: './src/store',
          styles: './src/styles',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
}
