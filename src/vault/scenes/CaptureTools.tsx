import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Phone, progress } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { ScanUI } from "../components/FeatureUI";

export type CaptureProps = {
  scan: FeatureClip;
  crop: FeatureClip;
  rotate: FeatureClip;
  filter: FeatureClip;
  pages: FeatureClip;
  imports: FeatureClip;
};

export const CaptureTools = (props: CaptureProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const left =
    progress(frame, 1.8 * fps, 2.15 * fps) *
    (1 - progress(frame, 4.8 * fps, 5.15 * fps));
  const right =
    progress(frame, 4.8 * fps, 5.15 * fps) *
    (1 - progress(frame, 6.5 * fps, 6.85 * fps));
  const center = Math.min(
    1,
    1 -
      progress(frame, 1.8 * fps, 2.15 * fps) +
      progress(frame, 6.5 * fps, 6.85 * fps),
  );
  const caption =
    t < 2
      ? "Scan a page."
      : t < 3.6
        ? "Shape the crop."
        : t < 5
          ? "Get the angle right."
          : t < 6.7
            ? "Enhance every detail."
            : t < 7.8
              ? "Multiple pages. One PDF."
              : "Bring in photos and PDFs.";
  return (
    <Film pending={Object.values(props).some((clip) => !clip.file)}>
      <div
        style={{
          position: "absolute",
          top: 68,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 76,
          letterSpacing: "-0.055em",
          fontWeight: 600,
        }}
      >
        Capture. Shape. Keep.
      </div>
      <Phone
        style={{
          left: 330,
          top: 260,
          width: 320,
          height: 650,
          scale: 0.88 + left * 0.22,
          opacity: 0.4 + left * 0.6,
          transform: `perspective(1800px) rotateY(${14 * (1 - left)}deg)`,
          zIndex: left > 0.5 ? 3 : 1,
        }}
      >
        <FeatureMedia clip={{ ...props.crop, holdAfterSeconds: 0 }}>
          <ScanUI kind="crop" />
        </FeatureMedia>
        <Sequence
          name="Crop handles"
          from={2 * fps}
          durationInFrames={Math.round(1.6 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.crop}>
            <ScanUI kind="crop" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Rotate scan"
          from={Math.round(3.6 * fps)}
          durationInFrames={Math.round(1.4 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.rotate}>
            <ScanUI kind="rotate" />
          </FeatureMedia>
        </Sequence>
      </Phone>
      <Phone
        style={{
          left: 800,
          top: 260,
          width: 320,
          height: 650,
          scale: 0.88 + center * 0.22,
          opacity: 0.4 + center * 0.6,
          zIndex: center > 0.5 ? 3 : 1,
        }}
      >
        <FeatureMedia clip={{ ...props.scan, holdAfterSeconds: 0 }}>
          <ScanUI />
        </FeatureMedia>
        <Sequence
          name="Camera scan"
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.scan}>
            <ScanUI />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Multi-page PDF"
          from={Math.round(6.7 * fps)}
          durationInFrames={Math.round(1.1 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.pages}>
            <ScanUI kind="pages" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Image and PDF import"
          from={Math.round(7.8 * fps)}
          durationInFrames={Math.round(1.6 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.imports}>
            <ScanUI kind="imports" />
          </FeatureMedia>
        </Sequence>
      </Phone>
      <Phone
        style={{
          left: 1270,
          top: 260,
          width: 320,
          height: 650,
          scale: 0.88 + right * 0.22,
          opacity: 0.4 + right * 0.6,
          transform: `perspective(1800px) rotateY(${-14 * (1 - right)}deg)`,
          zIndex: right > 0.5 ? 3 : 1,
        }}
      >
        <FeatureMedia clip={{ ...props.filter, holdAfterSeconds: 0 }}>
          <ScanUI kind="filter" />
        </FeatureMedia>
        <Sequence
          name="Scan filter before and after"
          from={5 * fps}
          durationInFrames={Math.round(1.7 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.filter}>
            <ScanUI kind="filter" />
          </FeatureMedia>
        </Sequence>
      </Phone>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 973,
          textAlign: "center",
          fontSize: 34,
          letterSpacing: "-0.03em",
          color: "#6650a4",
        }}
      >
        {caption}
      </div>
    </Film>
  );
};
