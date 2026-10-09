import { useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Phone, Library, progress } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { ScanUI, FolderUI, Surface, Button } from "../components/FeatureUI";

export type ExtrasProps = {
  anchor: FeatureClip;
  first: FeatureClip;
  second: FeatureClip;
  third: FeatureClip;
};

const ExtrasGroup = ({
  anchor,
  first,
  second,
  third,
  mode,
}: {
  anchor: FeatureClip;
  first: FeatureClip;
  second: FeatureClip;
  third: FeatureClip;
  mode: "refine" | "organize";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrival = progress(frame, 0, 0.35 * fps);
  const refine = mode === "refine";
  return (
    <Film pending={[anchor, first, second, third].some((clip) => !clip.file)}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 76,
          textAlign: "center",
          fontSize: 72,
          fontWeight: 600,
          letterSpacing: "-0.055em",
        }}
      >
        {refine ? "Make every page yours." : "Make room for your world."}
      </div>
      <Phone
        style={{
          left: 205,
          top: 245,
          width: 310,
          height: 635,
          opacity: 0.7,
          translate: `0px ${(1 - arrival) * 16}px`,
          transform: "perspective(2000px) rotateY(6deg)",
        }}
      >
        <FeatureMedia clip={anchor}>
          {refine ? <ScanUI kind="pages" /> : <Library />}
        </FeatureMedia>
      </Phone>
      <Phone
        style={{
          left: 605,
          top: 245,
          width: 310,
          height: 635,
          translate: `0px ${(1 - arrival) * 20}px`,
        }}
      >
        <FeatureMedia clip={first}>
          {refine ? <ScanUI kind="crop" /> : <FolderUI kind="create" />}
        </FeatureMedia>
      </Phone>
      <Phone
        style={{
          left: 1005,
          top: 245,
          width: 310,
          height: 635,
          translate: `0px ${(1 - arrival) * 22}px`,
        }}
      >
        <FeatureMedia clip={second}>
          {refine ? <ScanUI kind="filter" /> : <FolderUI kind="rename" />}
        </FeatureMedia>
      </Phone>
      <Phone
        style={{
          left: 1405,
          top: 245,
          width: 310,
          height: 635,
          translate: `0px ${(1 - arrival) * 24}px`,
          transform: "perspective(2000px) rotateY(-6deg)",
        }}
      >
        <FeatureMedia clip={third}>
          {refine ? <ReorderUI /> : <CompactEditUI />}
        </FeatureMedia>
      </Phone>
      <div
        style={{
          position: "absolute",
          top: 919,
          left: 205,
          width: 310,
          textAlign: "center",
          fontSize: 25,
          color: "#74747c",
        }}
      >
        {refine ? "Your document" : "Your library"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 919,
          left: 605,
          width: 310,
          textAlign: "center",
          fontSize: 30,
          color: "#6650a4",
        }}
      >
        {refine ? "Crop" : "Create folders"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 919,
          left: 1005,
          width: 310,
          textAlign: "center",
          fontSize: 30,
          color: "#6650a4",
        }}
      >
        {refine ? "Enhance" : "Rename"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 919,
          left: 1405,
          width: 310,
          textAlign: "center",
          fontSize: 30,
          color: "#6650a4",
        }}
      >
        {refine ? "Arrange pages" : "Edit text"}
      </div>
    </Film>
  );
};

export const RefineExtras = (props: ExtrasProps) => (
  <ExtrasGroup {...props} mode="refine" />
);
export const OrganizeExtras = (props: ExtrasProps) => (
  <ExtrasGroup {...props} mode="organize" />
);

const ReorderUI = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, 0.4 * fps, 1.5 * fps);
  return (
    <Surface title="Arrange pages">
      <div style={{ position: "relative", height: 360 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120 * (1 - p),
            height: 105,
            padding: "22px 18px",
            boxSizing: "border-box",
            borderRadius: 14,
            backgroundColor: "#e9e1f6",
            fontSize: 24,
            color: "#6650a4",
            boxShadow: "0 6px 18px rgba(50,30,70,0.08)",
          }}
        >
          Page 1<br />
          <span style={{ fontSize: 14 }}>Laptop warranty</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120 * p,
            height: 105,
            padding: "22px 18px",
            boxSizing: "border-box",
            borderRadius: 14,
            backgroundColor: "white",
            border: "1px solid #ddd6e7",
            fontSize: 24,
          }}
        >
          Page 2<br />
          <span style={{ fontSize: 14 }}>Warranty conditions</span>
        </div>
      </div>
      <Button active>Done</Button>
    </Surface>
  );
};

const CompactEditUI = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const corrected = frame > 0.8 * fps;
  const saved = frame > 1.7 * fps;
  return (
    <Surface title="Extracted text">
      <div style={{ fontSize: 14, color: "#74747c", marginBottom: 24 }}>
        {saved ? "User Edited" : "Original OCR"}
      </div>
      <div
        style={{
          padding: 18,
          border: "1px solid #d1c7df",
          borderRadius: 12,
          backgroundColor: "white",
          fontSize: 23,
          lineHeight: 1.45,
        }}
      >
        Your laptop is covered for two{" "}
        <span style={{ backgroundColor: "#e9defb" }}>
          {corrected ? "years" : "yeers"}
        </span>{" "}
        from the purchase date.
      </div>
      <div style={{ marginTop: 26 }}>
        <Button active={!saved}>Save Page</Button>
      </div>
      <div
        style={{
          fontSize: 17,
          marginTop: 29,
          color: "#6650a4",
          opacity: saved ? 1 : 0,
        }}
      >
        Text updated
      </div>
    </Surface>
  );
};
