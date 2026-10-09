import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Document } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { TextUI } from "../components/FeatureUI";

export type TextProps = {
  reference: FeatureClip;
  ocr: FeatureClip;
  editText: FeatureClip;
  saveText: FeatureClip;
  ocrMenu: FeatureClip;
};

export const TextControl = (props: TextProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const label =
    t < 2.3
      ? "Extract on your device."
      : t < 4.3
        ? "Make a correction."
        : t < 5.8
          ? "Save your changes."
          : "Stay in control of the text.";
  return (
    <Film pending={Object.values(props).some((clip) => !clip.file)}>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 80,
          fontSize: 79,
          letterSpacing: "-0.055em",
          fontWeight: 600,
        }}
      >
        Your text. Your control.
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 259,
          width: 580,
          height: 669,
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "0 18px 55px rgba(30,20,45,0.09)",
          rotate: "-2deg",
        }}
      >
        <FeatureMedia clip={{ ...props.reference, holdAfterSeconds: 0 }}>
          <Document compact highlight />
        </FeatureMedia>
      </div>
      <div
        style={{
          position: "absolute",
          left: 822,
          top: 260,
          width: 944,
          height: 588,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 65px rgba(30,20,45,0.1)",
        }}
      >
        <Sequence
          name="On-device OCR result"
          durationInFrames={Math.round(2.3 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.ocr}>
            <TextUI kind="extract" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Correct extracted text"
          from={Math.round(2.3 * fps)}
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.editText}>
            <TextUI kind="edit" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Save edited page"
          from={Math.round(4.3 * fps)}
          durationInFrames={Math.round(1.5 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.saveText}>
            <TextUI kind="save" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="OCR controls"
          from={Math.round(5.8 * fps)}
          durationInFrames={Math.round(1.54 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.ocrMenu}>
            <TextUI kind="menu" />
          </FeatureMedia>
        </Sequence>
      </div>
      <div
        style={{
          position: "absolute",
          left: 822,
          top: 909,
          fontSize: 36,
          color: "#6650a4",
          letterSpacing: "-0.03em",
        }}
      >
        {label}
      </div>
    </Film>
  );
};
