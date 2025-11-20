import type { Context } from "hono";

import { OgImage } from "./OgImage";
import { FONTS } from "../consts";
import satori from "satori";
import { Resvg } from "@resvg/resvg-wasm";
import { Buffer } from "buffer";
import fs from "node:fs/promises";
import path from "node:path";

interface FontOptions {
  name: string;
  data: ArrayBuffer;
  style: "normal" | "italic";
}

let isWasmInitialized = false;

export const getOgImageHandler = async (c: Context) => {
  try {
    console.log("font loading...");
    const fontDataPromise = FONTS.map(async (font) => {
      const fontPath = path.join(
        process.cwd(),
        process.env.NODE_ENV == "production" ? font.file : "assets/" + font.file
      );

      return {
        name: font.name,
        data: (await fs.readFile(fontPath)).buffer,
        style: "normal",
      } satisfies FontOptions;
    });
    const fontData = await Promise.all(fontDataPromise);
    console.log("font loaded");
    const title = c.req.query("title");

    console.log("generating svg...");
    const svg = await satori(<OgImage title={title} />, {
      width: 1200,
      height: 630,
      fonts: fontData,
    });
    console.log("generated svg");

    console.log("converting to png...");
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200,
      },
    });
    const image = resvg.render();
    console.log("converted to png");

    return c.body(Buffer.from(image.asPng()), 200, {
      "Content-Type": "image/png",
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
