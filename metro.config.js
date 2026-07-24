const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { resolveRequest: defaultResolveRequest } = config.resolver;

// tsyringe ships an ESM build (dist/esm5) whose named "tslib" imports assume
// a default-export interop shape. Metro's package.json "exports"-aware
// resolution picks that build for the web platform and it crashes at
// runtime ("Cannot destructure property '__extends' of 'tslib.default'").
// Force just this one package to its CJS build instead of disabling
// exports-field resolution globally (that broke @radix-ui/primitive, which
// is exports-only and has no equivalent flat file path).
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'tsyringe') {
    return {
      type: 'sourceFile',
      filePath: require.resolve('tsyringe/dist/cjs/index.js'),
    };
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
