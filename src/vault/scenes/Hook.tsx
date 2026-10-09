import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Film, Document, ease, progress } from "../components/Film";

export const Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settle = progress(frame, 3 * fps, 4 * fps);
  return (
    <Film dark>
      <Interactive.Div
        name="Opening premise"
        style={{
          position: "absolute",
          left: 128,
          top: 96,
          fontSize: 112,
          letterSpacing: "-0.06em",
          fontWeight: 600,
          opacity: interpolate(
            frame,
            [0, 0.7 * fps, 3 * fps, 4 * fps],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            },
          ),
        }}
      >
        Your documents.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 350,
          width: 380,
          height: 520,
          rotate: "-13deg",
          opacity: 0.32 * (1 - settle),
          translate: `0px ${(1 - progress(frame, 0, fps)) * 65}px`,
        }}
      >
        <Document
          compact
          title={"Course\nnotes"}
          section="Key ideas"
          body="Build understanding from your own study materials."
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1210,
          top: 255,
          width: 360,
          height: 500,
          rotate: "12deg",
          opacity: 0.4 * (1 - settle),
          translate: `0px ${(1 - progress(frame, 0.3 * fps, 1.4 * fps)) * 80}px`,
        }}
      >
        <Document
          compact
          title={"Project\nagreement"}
          section="Project details"
          body="Keep the terms, decisions, and context close."
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 690 + settle * 100,
          top: 310 - settle * 60,
          width: 430 - settle * 90,
          height: 600 + settle * 90,
          rotate: `${-4 * (1 - progress(frame, 0, 2 * fps))}deg`,
          boxShadow: "0 24px 100px rgba(181,162,227,0.1)",
          borderRadius: 16,
          overflow: "hidden",
          translate: `0px ${(1 - progress(frame, 0, 1.3 * fps)) * 100}px`,
        }}
      >
        <Document compact />
      </div>
      <Interactive.Div
        name="Opening question"
        style={{
          position: "absolute",
          left: 1310,
          top: 790,
          fontSize: 48,
          letterSpacing: "-0.045em",
          lineHeight: 1.1,
          opacity: progress(frame, 1.2 * fps, 2 * fps) * (1 - settle),
        }}
      >
        What if they
        <br />
        could answer?
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 132,
          top: 971,
          width: 140,
          height: 4,
          backgroundColor: "#b5a2e3",
          scale: progress(frame, 0, fps),
          transformOrigin: "left center",
        }}
      />
    </Film>
  );
};
