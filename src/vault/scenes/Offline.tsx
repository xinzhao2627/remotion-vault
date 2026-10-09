import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Phone, OfflineScreen, progress } from "../components/Film";
import { MediaLayer, type ClipProps } from "../components/MediaLayer";

export const Offline = ({ file, trimSeconds, camera }: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Film dark pending={!file}>
      <Phone dark style={{ left: 790, top: 140, width: 340, height: 720 }}>
        <MediaLayer file={file} trimSeconds={trimSeconds} camera={camera}>
          <OfflineScreen />
        </MediaLayer>
      </Phone>
      <Interactive.Div
        name="Even"
        style={{
          position: "absolute",
          left: 190,
          top: 385,
          fontSize: 128,
          fontWeight: 600,
          letterSpacing: "-0.06em",
          opacity: progress(frame, 2.3 * fps, 3 * fps),
          translate: "230.8px 3.6px",
        }}
      >
        Even
      </Interactive.Div>
      <Interactive.Div
        name="Offline"
        style={{
          position: "absolute",
          left: 1210,
          top: 385,
          fontSize: 128,
          fontWeight: 600,
          letterSpacing: "-0.06em",
          opacity: progress(frame, 2.6 * fps, 3.3 * fps),
        }}
      >
        offline.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 925,
          textAlign: "center",
          fontSize: 38,
          letterSpacing: "-0.025em",
          color: "#b5a2e3",
          opacity: progress(frame, 3.3 * fps, 4 * fps),
        }}
      >
        Your information stays with you.
      </div>
    </Film>
  );
};
