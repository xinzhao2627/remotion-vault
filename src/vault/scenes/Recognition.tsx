import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Document, progress } from "../components/Film";
import { MediaLayer, type ClipProps } from "../components/MediaLayer";

export const Recognition = ({
  file,
  trimSeconds,
  camera,
  holdAfterSeconds,
}: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const text = "Your laptop is covered for two years from the purchase date.";
  const count = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - 1.2 * fps) * 1.4)),
  );
  return (
    <Film pending={!file}>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 74,
          width: 810,
          height: 940,
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 20px 75px rgba(25,20,35,0.12)",
          rotate: `${-2 * (1 - progress(frame, 0, fps))}deg`,
        }}
      >
        <MediaLayer
          file={file}
          trimSeconds={trimSeconds}
          camera={camera}
          holdAfterSeconds={holdAfterSeconds}
        >
          <Document highlight={frame > fps} />
        </MediaLayer>
        {!file ? (
          <div
            style={{
              position: "absolute",
              left: 36,
              top: 600 * progress(frame, 0.4 * fps, 1.5 * fps) + 70,
              width: 738,
              height: 2,
              backgroundColor: "#6650a4",
              opacity: 1 - progress(frame, 1.7 * fps, 2.2 * fps),
            }}
          />
        ) : null}
      </div>
      <Interactive.Div
        name="Recognition premise"
        style={{
          position: "absolute",
          left: 1040,
          top: 168,
          fontSize: 66,
          letterSpacing: "-0.055em",
          lineHeight: 1.08,
          fontWeight: 600,
        }}
      >
        A page.
        <br />
        Now searchable.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 1040,
          top: 416,
          width: 724,
          minHeight: 320,
          borderLeft: "4px solid #6650a4",
          paddingLeft: 40,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 25, color: "#6650a4", marginBottom: 36 }}>
          On-device text recognition
        </div>
        <div
          style={{ fontSize: 46, lineHeight: 1.35, letterSpacing: "-0.04em" }}
        >
          {file
            ? "Find the words. Keep them on your device."
            : text.slice(0, count)}
          <span
            style={{ color: "#6650a4", opacity: frame < 3.5 * fps ? 1 : 0 }}
          >
            │
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1040,
          top: 868,
          fontSize: 30,
          color: "#74747c",
          opacity: progress(frame, 2.5 * fps, 3.3 * fps),
        }}
      >
        Your page becomes personal knowledge.
      </div>
    </Film>
  );
};
