import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { fontFamily } from "./design/fonts";

const motionStudySchema = z.object({
  headline: z.string().min(1).max(60),
  supportingText: z.string().max(100),
  backgroundColor: zColor(),
  textColor: zColor(),
});

type MotionStudyProps = z.infer<typeof motionStudySchema>;

// Neutral typography and motion calibration, pending the real product brief.
export const MotionStudy: React.FC<MotionStudyProps> = ({
  headline,
  supportingText,
  backgroundColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        color: textColor,
        fontFamily,
        justifyContent: "center",
        padding: `${height * 0.12}px ${width * 0.12}px`,
      }}
    >
      <Interactive.Div
        name="Hero typography"
        premountFor={fps}
        style={{
          fontSize: width * 0.09,
          fontWeight: 600,
          letterSpacing: "-0.055em",
          lineHeight: 1.02,
          whiteSpace: "pre-line",
          textWrap: "balance",
          opacity: interpolate(frame, [0, 0.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 1.2 * fps],
            ["0px 48px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(frame, [0, 1.2 * fps], [0.98, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "left center",
        }}
      >
        {headline}
      </Interactive.Div>
      <Interactive.Div
        name="Supporting typography"
        premountFor={fps}
        style={{
          marginTop: height * 0.065,
          fontSize: width * 0.025,
          fontWeight: 400,
          letterSpacing: "-0.025em",
          lineHeight: 1.35,
          maxWidth: width * 0.6,
          textWrap: "balance",
          opacity: interpolate(frame, [0.7 * fps, 1.6 * fps], [0, 0.65], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0.7 * fps, 1.6 * fps],
            ["0px 18px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        {supportingText}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <>
    <Composition
      id="MotionStudy"
      component={MotionStudy}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={480}
      schema={motionStudySchema}
      defaultProps={{
        headline: "Clarity.\nIn motion.",
        supportingText: "A study in type, timing, and restraint.",
        backgroundColor: "#f5f5f7",
        textColor: "#1d1d1f",
      }}
    />
    <Composition
      id="MotionStudy4K"
      component={MotionStudy}
      width={3840}
      height={2160}
      fps={60}
      durationInFrames={480}
      schema={motionStudySchema}
      defaultProps={{
        headline: "Clarity.\nIn motion.",
        supportingText: "A study in type, timing, and restraint.",
        backgroundColor: "#f5f5f7",
        textColor: "#1d1d1f",
      }}
    />
  </>
);
