module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@services": "./src/services",
            "@infrastructure": "./src/infrastructure",
            "@types": "./src/types",
            // "@utils": "./src/utils",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
