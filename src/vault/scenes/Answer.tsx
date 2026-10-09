import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, Document, progress } from "../components/Film";
import { MediaLayer, type ClipProps } from "../components/MediaLayer";

export const Answer = ({
  file,
  trimSeconds,
  camera,
  holdAfterSeconds,
}: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const question = "How long is the laptop warranty?";
  const questionCount = Math.max(
    0,
    Math.min(question.length, Math.floor(frame * 0.95)),
  );
  const answer = progress(frame, 2.6 * fps, 3.6 * fps);
  const reply = "Your laptop warranty lasts two years from the purchase date.";
  const replyCount = Math.max(
    0,
    Math.min(reply.length, Math.floor((frame - 3 * fps) * 1.4)),
  );
  return (
    <Film pending={!file}>
      {file ? (
        <>
          <Interactive.Div
            name="Recorded answer heading"
            style={{
              position: "absolute",
              left: 128,
              top: 170,
              fontSize: 96,
              letterSpacing: "-0.055em",
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            Ask your
            <br />
            documents.
          </Interactive.Div>
          <div
            style={{
              position: "absolute",
              left: 710,
              top: 82,
              width: 1060,
              height: 900,
              borderRadius: 30,
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 30px 80px rgba(30,20,40,0.12)",
            }}
          >
            <MediaLayer
              file={file}
              trimSeconds={trimSeconds}
              camera={camera}
              holdAfterSeconds={holdAfterSeconds}
            >
              {null}
            </MediaLayer>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: 150,
              top: 86,
              fontSize: 28,
              color: "#6650a4",
            }}
          >
            Ask your documents
          </div>
          <Interactive.Div
            name="Question typing"
            style={{
              position: "absolute",
              left: 150,
              top: 230 - progress(frame, 2 * fps, 3 * fps) * 58,
              fontSize: 67,
              lineHeight: 1.15,
              letterSpacing: "-0.055em",
              width: 1610,
            }}
          >
            {question.slice(0, questionCount)}
            <span
              style={{ color: "#6650a4", opacity: frame < 2 * fps ? 1 : 0 }}
            >
              │
            </span>
          </Interactive.Div>
          <div
            style={{
              position: "absolute",
              top: 326,
              left: 150,
              height: 2,
              width: 1620,
              backgroundColor: "#d9d2e4",
              scale: progress(frame, 0, 0.7 * fps),
              transformOrigin: "left center",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 150,
              top: 390,
              width: 555,
              height: 515,
              borderRadius: 20,
              overflow: "hidden",
              opacity: answer,
              translate: `0px ${(1 - answer) * 35}px`,
              boxShadow: "0 15px 45px rgba(30,20,40,0.07)",
            }}
          >
            <Document compact highlight />
          </div>
          <div
            style={{
              position: "absolute",
              left: 850,
              top: 400,
              width: 855,
              opacity: answer,
              translate: `0px ${(1 - answer) * 30}px`,
            }}
          >
            <div style={{ fontSize: 26, color: "#6650a4", marginBottom: 38 }}>
              Local AI / Your answer
            </div>
            <div
              style={{
                fontSize: 66,
                letterSpacing: "-0.05em",
                lineHeight: 1.15,
                fontWeight: 600,
              }}
            >
              {reply.slice(0, replyCount)}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 1160,
              top: 790,
              width: 450,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "#e9e2f5",
              color: "#6650a4",
              fontSize: 26,
              opacity: progress(frame, 4.7 * fps, 5.3 * fps),
              boxShadow: frame > 7.6 * fps ? "0 0 0 3px #b5a2e3" : "none",
            }}
          >
            Laptop warranty · Page 1
          </div>
          <div
            style={{
              position: "absolute",
              left: 850,
              top: 922,
              fontSize: 30,
              color: "#74747c",
              opacity: progress(frame, 5 * fps, 5.8 * fps),
            }}
          >
            Relevant information. An answer you can trace.
          </div>
        </>
      )}
    </Film>
  );
};
