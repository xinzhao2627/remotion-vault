import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Document } from "../components/Film";
import { FeatureMedia, type FeatureClip } from "../components/FeatureMedia";
import { ScopeUI, AnswerUI } from "../components/FeatureUI";

export type ScopedProps = {
  scope: FeatureClip;
  answer: FeatureClip;
  source: FeatureClip;
};

export const ScopedAnswer = (props: ScopedProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <Film
      pending={!props.scope.file || !props.answer.file || !props.source.file}
    >
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 176,
          width: 450,
          fontSize: 79,
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: "-0.055em",
        }}
      >
        {t < 2 ? (
          <>
            Ask with
            <br />
            focus.
          </>
        ) : t < 8 ? (
          <>
            Useful
            <br />
            answers.
          </>
        ) : (
          <>
            Open the
            <br />
            evidence.
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 554,
          width: 405,
          fontSize: 30,
          lineHeight: 1.45,
          color: "#6650a4",
        }}
      >
        {t < 2
          ? "One document. One folder. Your whole library."
          : t < 8
            ? "Local AI, connected to your documents."
            : "Return to the original source page."}
      </div>
      <div
        style={{
          position: "absolute",
          left: 665,
          top: 84,
          width: 1104,
          height: 860,
          borderRadius: 26,
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(35,20,50,0.13)",
          backgroundColor: "white",
        }}
      >
        <Sequence
          name="Select search scope"
          durationInFrames={2 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.scope}>
            <ScopeUI />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Local-model answer"
          from={2 * fps}
          durationInFrames={6 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.answer}>
            <AnswerUI />
          </FeatureMedia>
        </Sequence>
        <Sequence
          name="Open cited source"
          from={8 * fps}
          durationInFrames={3 * fps}
          premountFor={fps}
        >
          <FeatureMedia clip={props.source}>
            <Document highlight />
          </FeatureMedia>
        </Sequence>
      </div>
      <div
        style={{
          position: "absolute",
          left: 665,
          top: 978,
          fontSize: 27,
          color: "#74747c",
        }}
      >
        {t < 8
          ? "Search scope / Local model / Source references"
          : props.source.file
            ? "Original source document"
            : "Laptop warranty / Page 1"}
      </div>
    </Film>
  );
};
