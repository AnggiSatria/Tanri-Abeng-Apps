const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-dotenv'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'ts', 'tsx'], // Dukungan untuk TypeScript
    },
  };
})();
