import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { ReaderUI } from "../components/FeatureUI";

export type ReadProps = { pdfPages: FeatureClip; imageZoom: FeatureClip };

export const ReadInspect = (props: ReadProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const image = frame >= 3 * fps;
  return (
    <Film pending={!props.pdfPages.file || !props.imageZoom.file}>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 172,
          width: 460,
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: "-0.055em",
          lineHeight: 1.07,
        }}
      >
        {image ? (
          <>
            Zoom into
            <br />
            what matters.
          </>
        ) : (
          <>
            Page
            <br />
            by page.
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 592,
          width: 410,
          fontSize: 32,
          lineHeight: 1.4,
          color: "#6650a4",
        }}
      >
        {image
          ? "Inspect image details with zoom and pan."
          : "Read multi-page PDFs with clear page navigation."}
      </div>
      <div
        style={{
          position: "absolute",
          left: 665,
          top: 65,
          width: 1110,
          height: 947,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(35,20,50,0.12)",
          backgroundColor: "white",
        }}
      >
        <Sequence
          name="PDF page navigation"
          durationInFrames={3 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.pdfPages}>
            <ReaderUI kind="pdf" />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Image zoom and pan"
          from={3 * fps}
          durationInFrames={Math.round(3.34 * fps)}
          premountFor={fps}
        >
          <FeatureMedia clip={props.imageZoom}>
            <ReaderUI kind="image" />
          </FeatureMedia>
        </Sequence>
      </div>
    </Film>
  );
};
