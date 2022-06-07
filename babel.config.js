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
            "components": "./src/components",
            "fonts": "./assets/fonts",
            "icons": "./assets/icons",
            "app": "./src/app",
            "utils": "./src/utils",
            "hooks": "./src/hooks",
            "game": "./src/game",
            "theme": "./src/theme.ts",
          }
        }
      ]
    ]
  };
};
