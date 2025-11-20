import { build } from "esbuild";
import { copyPlugin } from "@sprout2000/esbuild-copy-plugin";

const buildOptions: Parameters<typeof build>[0] = {
  entryPoints: ["./src/lambda.ts"],
  bundle: true,
  platform: "node",
  outfile: "./dist/index.mjs",
  target: "node22",
  format: "esm",
  loader: {
    ".node": "file",
  },
  plugins: [
    copyPlugin({
      src: "./node_modules/@resvg/resvg-wasm/index_bg.wasm",
      dest: "./dist/index_bg.wasm",
    }),
    copyPlugin({
      src: "./public/ZenMaruGothic-Medium.ttf",
      dest: "./dist/ZenMaruGothic-Medium.ttf",
    }),
    copyPlugin({
      src: "./public/metro-retro.regular.ttf",
      dest: "./dist/metro-retro.regular.ttf",
    }),
    copyPlugin({
      src: "./public/ogp-background.png",
      dest: "./dist/ogp-background.png",
    }),
  ],
};

build(buildOptions).then((buildResult) => {
  console.log({ buildResult });
});
