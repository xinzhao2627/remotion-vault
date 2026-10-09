import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, progress } from "../components/Film";
import { ScanUI, FolderUI, AnswerUI } from "../components/FeatureUI";

export const FeatureIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const word =
    frame < fps ? "Capture." : frame < 2 * fps ? "Organize." : "Understand.";
  return (
    <Film dark>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 166,
          fontSize: 188,
          lineHeight: 1,
          fontWeight: 600,
          letterSpacing: "-0.075em",
        }}
      >
        Vault.
      </div>
      <div
        style={{
          position: "absolute",
          left: 138,
          top: 482,
          fontSize: 85,
          letterSpacing: "-0.055em",
          color: "#b5a2e3",
        }}
      >
        {word}
      </div>
      <div
        style={{
          position: "absolute",
          left: 138,
          top: 725,
          fontSize: 31,
          color: "#a99abe",
        }}
      >
        Your document workflow. On your device.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1030,
          top: 123,
          width: 730,
          height: 800,
          borderRadius: 32,
          overflow: "hidden",
          scale: 0.97 + progress(frame, 0, fps) * 0.03,
        }}
      >
        <Sequence
          name="Capture glimpse"
          durationInFrames={fps}
          premountFor={fps}
        >
          <ScanUI kind="crop" />
        </Sequence>
        <Sequence
          name="Organization glimpse"
          from={fps}
          durationInFrames={fps}
          premountFor={fps}
        >
          <FolderUI kind="create" />
        </Sequence>
        <Sequence
          name="AI glimpse"
          from={2 * fps}
          durationInFrames={Math.round(1.27 * fps)}
          premountFor={fps}
        >
          <AnswerUI quick />
        </Sequence>
      </div>
      <div
        style={{
          position: "absolute",
          left: 138,
          top: 935,
          width: 160,
          height: 4,
          backgroundColor: "#b5a2e3",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 64,
          bottom: 38,
          color: "#a99abe",
          fontSize: 17,
        }}
      >
        Illustrative feature preview
      </div>
    </Film>
  );
};
