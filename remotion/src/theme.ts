import { loadFont as loadHand } from "@remotion/google-fonts/Caveat";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";

export const hand = loadHand("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily;
export const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["400", "700"], subsets: ["latin"] }).fontFamily;

export const C = {
  bg: "#0B1F1E",
  bgDeep: "#071615",
  cream: "#EFE6D3",
  creamDeep: "#E3D8C1",
  ink: "#0C3B37",
  teal: "#12B3A6",
  cyan: "#5FE3D4",
  shadow: "rgba(0,0,0,0.55)",
};