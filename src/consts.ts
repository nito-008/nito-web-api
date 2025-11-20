// Fonts
export type Font = {
  name: string;
  file: string;
};

const FONT_ZEN_MARU_GOTHIC: Font = {
  name: "Zen Maru Gothic",
  file: "ZenMaruGothic-Medium.ttf",
} as const;

const FONT_RETRO_METRO_NF: Font = {
  name: "Retro Metro NF",
  file: "metro-retro.regular.ttf",
} as const;

export const FONTS: Array<Font> = [FONT_ZEN_MARU_GOTHIC, FONT_RETRO_METRO_NF];

// Images
export const IMG_URL_OGP_BG = "ogp-background.png";
