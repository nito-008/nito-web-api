import type { FC } from "hono/jsx";
import fs from "node:fs/promises";
import { IMG_URL_OGP_BG } from "../consts";

interface OgImageProps {
  title?: string;
}

const getBase64Image = async (path: string) => {
  const file = await fs.readFile(path);
  const base64 = Buffer.from(file.buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};

console.log("bg image loading...");
const bgImgBase64 = await getBase64Image(
  process.env.NODE_ENV == "production"
    ? IMG_URL_OGP_BG
    : "public/" + IMG_URL_OGP_BG,
);
console.log("bg image loaded");

export const OgImage: FC<OgImageProps> = ({ title }: OgImageProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 36,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgImgBase64})`,
        padding: "64px 64px 48px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontFamily: "Zen Maru Gothic",
          background: "white",
          borderRadius: 24,
          color: "black",
          height: "100%",
          padding: "48px 72px",
          wordBreak: "keep-all",
          overflowWrap: "anywhere",
        }}
      >
        {title}
      </div>
      <div
        style={{
          gap: 8,
          marginTop: 4,
          textAlign: "right",
          fontSize: 50,
          fontFamily: "Retro Metro NF",
          color: "white",
          alignSelf: "flex-end",
        }}
      >
        NITO&nbsp;LAB.
      </div>
    </div>
  );
};
