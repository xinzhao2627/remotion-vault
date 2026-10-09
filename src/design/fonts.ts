import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Inter";

// loadFont delays rendering until each local, licensed face has loaded.
void loadFont({
  family: fontFamily,
  url: staticFile("fonts/inter-latin-400-normal.woff2"),
  weight: "400",
});

void loadFont({
  family: fontFamily,
  url: staticFile("fonts/inter-latin-600-normal.woff2"),
  weight: "600",
});
