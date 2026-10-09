import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Phone, progress } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { FolderUI } from "../components/FeatureUI";

export type OrganizeProps = {
  createFolder: FeatureClip;
  saveFolder: FeatureClip;
  rename: FeatureClip;
  library: FeatureClip;
};

export const Organize = (props: OrganizeProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const action =
    t < 2
      ? "Create your own folders."
      : t < 4
        ? "Choose where it belongs."
        : t < 6
          ? "Name it your way."
          : "Keep your knowledge organized.";
  return (
    <Film pending={Object.values(props).some((clip) => !clip.file)}>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 165,
          fontSize: 88,
          lineHeight: 1.04,
          letterSpacing: "-0.055em",
          fontWeight: 600,
        }}
      >
        A place for
        <br />
        every document.
      </div>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 443,
          fontSize: 40,
          color: "#6650a4",
          letterSpacing: "-0.03em",
        }}
      >
        {action}
      </div>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 618,
          display: "flex",
          gap: 24,
        }}
      >
        <FolderTile
          name="Study"
          detail="Course notes"
          active={frame > 1.2 * fps}
        />
        <FolderTile name="Work" detail="Project files" />
        <FolderTile name="Personal" detail="Daily records" />
      </div>
      <Phone
        style={{
          left: 1210 - progress(frame, 0, 1.1 * fps) * 50,
          top: 132,
          width: 365,
          height: 790,
        }}
      >
        <Sequence
          name="Create folder"
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.createFolder}>
            <FolderUI kind="create" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Save into folder"
          from={2 * fps}
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.saveFolder}>
            <FolderUI kind="save" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Rename document"
          from={4 * fps}
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.rename}>
            <FolderUI kind="rename" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Organized folder contents"
          from={6 * fps}
          durationInFrames={Math.round(2.34 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.library}>
            <FolderUI kind="library" />
          </FeatureMedia>
        </Sequence>
      </Phone>
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 908,
          fontSize: 29,
          color: "#74747c",
        }}
      >
        Study notes. Work. Everyday paperwork.
      </div>
    </Film>
  );
};

const FolderTile = ({
  name,
  detail,
  active = false,
}: {
  name: string;
  detail: string;
  active?: boolean;
}) => (
  <div
    style={{
      width: 260,
      padding: 26,
      boxSizing: "border-box",
      backgroundColor: active ? "#e8def6" : "#eeedf1",
      borderRadius: 18,
      translate: active ? "0px -8px" : "0px 0px",
    }}
  >
    <div
      style={{
        width: 45,
        height: 30,
        backgroundColor: active ? "#6650a4" : "#aea6bb",
        borderRadius: "3px 8px 8px 8px",
        marginBottom: 25,
      }}
    />
    <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.04em" }}>
      {name}
    </div>
    <div style={{ fontSize: 19, color: "#74747c", marginTop: 15 }}>
      {detail}
    </div>
  </div>
);
