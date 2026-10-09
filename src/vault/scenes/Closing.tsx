import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Film, ease, progress } from "../components/Film";

export const Closing = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Film>
      <Interactive.Div
        name="Vault closing wordmark"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 315,
          textAlign: "center",
          fontSize: 268,
          fontWeight: 600,
          letterSpacing: "-0.075em",
          lineHeight: 1,
          scale: interpolate(frame, [0, 1.1 * fps], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          opacity: progress(frame, 0.15 * fps, 0.8 * fps),
        }}
      >
        Vault.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 674,
          display: "flex",
          justifyContent: "center",
          gap: 25,
          fontSize: 44,
          letterSpacing: "-0.035em",
          color: "#74747c",
        }}
      >
        <Interactive.Div
          name="Your documents"
          style={{ opacity: progress(frame, 0.8 * fps, 1.3 * fps) }}
        >
          Your documents.
        </Interactive.Div>
        <Interactive.Div
          name="Your intelligence"
          style={{ opacity: progress(frame, 1.2 * fps, 1.7 * fps) }}
        >
          Your intelligence.
        </Interactive.Div>
        <Interactive.Div
          name="Your device"
          style={{ opacity: progress(frame, 1.6 * fps, 2.1 * fps) }}
        >
          Your device.
        </Interactive.Div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 805,
          width: 120,
          height: 5,
          borderRadius: 4,
          backgroundColor: "#6650a4",
          scale: progress(frame, 2 * fps, 2.7 * fps),
        }}
      />
    </Film>
  );
};
