const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({}),
      require("unplugin-vue-components/webpack")({}),
    ],
  },
  // compilerOptions: {
  //   isCustomElement: (tag) => !["request-item"].includes(tag),
  // },
});
