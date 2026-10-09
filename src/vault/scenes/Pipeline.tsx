import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Film, progress } from "../components/Film";

export const Pipeline = () => {
  const currentFrame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const frame = currentFrame * ((8 * fps) / durationInFrames);
  const embeddings = progress(frame, 1 * fps, 2.5 * fps);
  const retrieval = progress(frame, 2.8 * fps, 4 * fps);
  const answer = progress(frame, 4 * fps, 5.2 * fps);
  const resolve = progress(frame, 6.5 * fps, 8 * fps);
  return (
    <Film dark>
      <Interactive.Div
        name="Personal RAG headline"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 96,
          textAlign: "center",
          fontSize: 72,
          letterSpacing: "-0.055em",
          fontWeight: 600,
          opacity: 1 - resolve,
        }}
      >
        Your personal RAG pipeline.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 275,
          width: 1688,
          height: 600,
          borderRadius: 58,
          border: "1px solid #4c405f",
          backgroundColor: "#08060b",
          opacity: 1 - resolve,
          scale: 1 - resolve * 0.12,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 306,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#b5a2e3",
          fontSize: 24,
          opacity: 1 - resolve,
        }}
      >
        Everything happens on your device
      </div>
      <div
        style={{
          position: "absolute",
          left: 205,
          top: 400,
          opacity: (1 - resolve) * progress(frame, 0, 0.5 * fps),
        }}
      >
        <div style={{ fontSize: 28, color: "#b5a2e3", marginBottom: 35 }}>
          Recognized text
        </div>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 12,
            backgroundColor: "#211a2c",
            fontSize: 27,
            marginBottom: 15,
            width: 275,
          }}
        >
          Your laptop
        </div>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 12,
            backgroundColor: "#352548",
            fontSize: 27,
            marginBottom: 15,
            width: 235,
          }}
        >
          two years
        </div>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 12,
            backgroundColor: "#211a2c",
            fontSize: 27,
            width: 275,
          }}
        >
          purchase date
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 672,
          top: 400,
          fontSize: 28,
          color: "#b5a2e3",
          opacity: (1 - resolve) * embeddings,
        }}
      >
        Vector embeddings
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0, opacity: 1 - resolve }}
      >
        <path
          d="M 530 588 L 635 588"
          stroke="#6650a4"
          strokeWidth="2"
          strokeDasharray="105"
          strokeDashoffset={105 * (1 - embeddings)}
        />
        {Array.from({ length: 108 }, (_, i) => {
          const col = i % 12;
          const row = Math.floor(i / 12);
          const group = Math.floor(i / 36);
          const chosen = group === 2;
          const angle = (i % 36) * 2.399;
          const radius = Math.sqrt(i % 36) * 8.4;
          const clusterX = 724 + group * 138 + Math.cos(angle) * radius;
          const clusterY = 580 + Math.sin(angle) * radius;
          const x =
            (1 - embeddings) * (534 + col * 3) +
            embeddings *
              ((688 + col * 31) * (1 - retrieval) + clusterX * retrieval);
          const y =
            (1 - embeddings) * (550 + row * 7) +
            embeddings *
              ((468 + row * 28) * (1 - retrieval) + clusterY * retrieval);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={chosen ? 4 + retrieval * 3 : 3.5}
              fill={chosen ? "#d9c5ff" : "#6650a4"}
              opacity={embeddings * (chosen ? 1 : 1 - retrieval * 0.65)}
            />
          );
        })}
        <path
          d="M 1075 588 L 1212 588"
          stroke="#b5a2e3"
          strokeWidth="2"
          strokeDasharray="137"
          strokeDashoffset={137 * (1 - answer)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 672,
          top: 775,
          fontSize: 24,
          color: "#a99abe",
          opacity: retrieval * (1 - resolve),
        }}
      >
        Local vector index / Relevant evidence
      </div>
      <div
        style={{
          position: "absolute",
          left: 1250 - resolve * 460,
          top: 440 - resolve * 65,
          width: 410 - resolve * 70,
          height: 300,
          borderRadius: 25,
          backgroundColor: "#e8ddfa",
          color: "#22172d",
          padding: "32px 35px",
          boxSizing: "border-box",
          opacity: answer,
          scale: 1 - resolve * 0.8,
          transformOrigin: "50% 50%",
        }}
      >
        <div style={{ fontSize: 22, color: "#6650a4", marginBottom: 30 }}>
          Local AI answer
        </div>
        <div
          style={{
            fontSize: 46,
            lineHeight: 1.12,
            letterSpacing: "-0.045em",
            fontWeight: 600,
          }}
        >
          Your warranty
          <br />
          lasts two years.
        </div>
        <div style={{ fontSize: 18, marginTop: 27 }}>
          Connected to its source.
        </div>
      </div>
      <Interactive.Div
        name="No cloud inference"
        style={{
          position: "absolute",
          left: 205,
          top: 929,
          fontSize: 35,
          letterSpacing: "-0.03em",
          opacity: progress(frame, 3 * fps, 3.6 * fps) * (1 - resolve),
        }}
      >
        No cloud inference.
      </Interactive.Div>
      <Interactive.Div
        name="No monthly AI API fees"
        style={{
          position: "absolute",
          right: 205,
          top: 929,
          fontSize: 35,
          letterSpacing: "-0.03em",
          opacity: progress(frame, 4 * fps, 4.6 * fps) * (1 - resolve),
        }}
      >
        No monthly AI API fees.
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 64,
          fontSize: 16,
          color: "#8e819f",
          opacity: 1 - resolve,
        }}
      >
        Conceptual pipeline
      </div>
    </Film>
  );
};
