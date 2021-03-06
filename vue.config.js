const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({}),
      require("unplugin-vue-components/webpack")({}),
    ],
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/SoftOnix_Find_Mentor/" : "/",
  // compilerOptions: {
  //   isCustomElement: (tag) => !["request-item"].includes(tag),
  // },
});
