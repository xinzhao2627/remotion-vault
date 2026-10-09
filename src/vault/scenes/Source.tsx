import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Document, progress } from "../components/Film";
import { MediaLayer, type ClipProps } from "../components/MediaLayer";

export const Source = ({
  file,
  trimSeconds,
  camera,
  holdAfterSeconds,
}: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Film pending={!file}>
      <Interactive.Div
        name="Source headline"
        style={{
          position: "absolute",
          left: 128,
          top: 226,
          width: 475,
          fontSize: 68,
          letterSpacing: "-0.055em",
          lineHeight: 1.06,
          fontWeight: 600,
        }}
      >
        The answer.
        <br />
        The evidence.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 497,
          width: 435,
          opacity: progress(frame, 0.4 * fps, 1.1 * fps),
        }}
      >
        <div
          style={{
            width: 65,
            height: 4,
            backgroundColor: "#6650a4",
            marginBottom: 30,
          }}
        />
        <div
          style={{ fontSize: 32, lineHeight: 1.4, letterSpacing: "-0.03em" }}
        >
          {file
            ? "Open the original page behind the answer."
            : "“Your laptop warranty lasts two years.”"}
        </div>
        <div style={{ fontSize: 22, color: "#6650a4", marginTop: 32 }}>
          Connected to the original source
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 62,
          width: 1090,
          height: 958,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "0 25px 75px rgba(30,20,40,0.12)",
          rotate: `${2 * (1 - progress(frame, 0, 0.8 * fps))}deg`,
        }}
      >
        <MediaLayer
          file={file}
          trimSeconds={trimSeconds}
          camera={camera}
          holdAfterSeconds={holdAfterSeconds}
        >
          <Document highlight />
        </MediaLayer>
      </div>
    </Film>
  );
};
