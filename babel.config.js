module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Remove NativeWind babel plugin as we're using twrnc instead
  };
};
