import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../../design/fonts";

export const colors = {
  paper: "#f5f5f7",
  ink: "#1d1d1f",
  muted: "#74747c",
  violet: "#6650a4",
  lilac: "#b5a2e3",
};
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const Film = ({
  children,
  dark = false,
  pending = false,
}: {
  children: ReactNode;
  dark?: boolean;
  pending?: boolean;
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? "#000000" : colors.paper,
      color: dark ? "white" : colors.ink,
      fontFamily,
      overflow: "hidden",
    }}
  >
    {children}
    {pending ? (
      <div
        style={{
          position: "absolute",
          right: 64,
          bottom: 38,
          fontSize: 17,
          color: dark ? "#b5a2e3" : "#6650a4",
          backgroundColor: dark ? "#18131f" : "#ece8f3",
          borderRadius: 20,
          padding: "8px 16px",
        }}
      >
        Illustrative footage placeholder
      </div>
    ) : null}
  </AbsoluteFill>
);

export const Phone = ({
  children,
  style,
  dark = false,
}: {
  children: ReactNode;
  style?: CSSProperties;
  dark?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      padding: 10,
      boxSizing: "border-box",
      borderRadius: 48,
      background:
        "linear-gradient(120deg, #69696e, #161619 28%, #55555a 70%, #151518)",
      boxShadow: dark ? "0 0 0 1px #45454b" : "0 35px 80px rgba(25,20,35,0.2)",
      ...style,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 39,
        backgroundColor: "white",
        color: colors.ink,
      }}
    >
      {children}
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 20,
        translate: "-50% 0",
        width: 86,
        height: 19,
        borderRadius: 18,
        backgroundColor: "#161619",
      }}
    />
  </div>
);

export const Document = ({
  compact = false,
  highlight = false,
  title = "Laptop\nwarranty",
  section = "Coverage period",
  body,
}: {
  compact?: boolean;
  highlight?: boolean;
  title?: string;
  section?: string;
  body?: string;
}) => (
  <div
    style={{
      height: "100%",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: compact ? "45px 28px" : "64px 68px",
      boxSizing: "border-box",
      color: colors.ink,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        fontSize: compact ? 15 : 22,
        color: colors.muted,
        marginBottom: compact ? 30 : 62,
      }}
    >
      Personal documents / Purchase records
    </div>
    <div
      style={{
        fontSize: compact ? 33 : 62,
        fontWeight: 600,
        lineHeight: 1.06,
        letterSpacing: "-0.05em",
        marginBottom: compact ? 34 : 66,
        whiteSpace: "pre-line",
      }}
    >
      {title}
    </div>
    <div
      style={{
        height: 2,
        backgroundColor: "#e5e5e9",
        marginBottom: compact ? 30 : 44,
      }}
    />
    <div
      style={{
        fontSize: compact ? 20 : 32,
        fontWeight: 600,
        marginBottom: compact ? 12 : 24,
      }}
    >
      {section}
    </div>
    <div
      style={{ fontSize: compact ? 18 : 30, lineHeight: 1.6, maxWidth: 620 }}
    >
      {body ?? (
        <>
          Your laptop is covered for{" "}
          <span
            style={{
              backgroundColor: highlight ? "#e9defb" : "transparent",
              boxDecorationBreak: "clone",
              padding: highlight ? "3px 6px" : 0,
              borderRadius: 4,
            }}
          >
            two years
          </span>{" "}
          from the purchase date.
        </>
      )}
    </div>
    <div
      style={{
        fontSize: compact ? 14 : 22,
        lineHeight: 1.65,
        color: colors.muted,
        marginTop: compact ? 36 : 55,
      }}
    >
      {body
        ? "Your reference material, ready when you need it."
        : "Keep this document with your receipt for future reference."}
    </div>
    <div
      style={{
        position: "absolute",
        bottom: compact ? 30 : 50,
        left: compact ? 28 : 68,
        color: colors.muted,
        fontSize: compact ? 12 : 18,
      }}
    >
      Illustrative demo document
    </div>
  </div>
);

export const Library = () => (
  <div
    style={{
      height: "100%",
      padding: "60px 25px 30px",
      boxSizing: "border-box",
      backgroundColor: "#faf9fc",
    }}
  >
    <div
      style={{
        fontSize: 33,
        fontWeight: 600,
        letterSpacing: "-0.05em",
        marginBottom: 12,
      }}
    >
      Vault
    </div>
    <div style={{ fontSize: 15, color: colors.muted, marginBottom: 38 }}>
      Your personal knowledge
    </div>
    <LibraryItem title="Laptop warranty" detail="Purchase records" />
    <LibraryItem title="Course notes" detail="Study materials" />
    <LibraryItem title="Project agreement" detail="Work documents" />
    <div
      style={{
        marginTop: 45,
        padding: "15px 18px",
        borderRadius: 25,
        backgroundColor: colors.violet,
        color: "white",
        fontSize: 18,
        textAlign: "center",
      }}
    >
      Ask your documents
    </div>
  </div>
);

const LibraryItem = ({ title, detail }: { title: string; detail: string }) => (
  <div
    style={{
      padding: "20px 0",
      borderBottom: "1px solid #e6e3ec",
      display: "flex",
      gap: 15,
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 37,
        height: 47,
        flexShrink: 0,
        borderRadius: 6,
        border: "1px solid #cfc6df",
        backgroundColor: "white",
        padding: "12px 8px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{ height: 3, backgroundColor: colors.violet, marginBottom: 5 }}
      />
      <div style={{ height: 2, backgroundColor: "#ddd7e6" }} />
    </div>
    <div>
      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.025em" }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: colors.muted, marginTop: 6 }}>
        {detail}
      </div>
    </div>
  </div>
);

export const OfflineScreen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const answer = progress(frame, 1.4 * fps, 2.4 * fps);
  return (
    <div
      style={{
        padding: "65px 25px",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#faf9fc",
      }}
    >
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          marginBottom: 30,
        }}
      >
        Vault
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 45, fontSize: 13 }}>
        <span
          style={{
            padding: "9px 12px",
            borderRadius: 15,
            backgroundColor: "#eae5f3",
            color: colors.violet,
          }}
        >
          Airplane mode
        </span>
        <span
          style={{
            padding: "9px 12px",
            borderRadius: 15,
            backgroundColor: "#ececf0",
            color: colors.muted,
          }}
        >
          Wi-Fi off
        </span>
      </div>
      <div
        style={{
          fontSize: 20,
          lineHeight: 1.35,
          padding: 18,
          backgroundColor: "#eeebf4",
          borderRadius: "18px 18px 4px 18px",
        }}
      >
        How long is the laptop warranty?
      </div>
      <div
        style={{
          opacity: answer,
          translate: `0px ${(1 - answer) * 12}px`,
          marginTop: 28,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.35 }}>
          Your warranty
          <br />
          lasts two years.
        </div>
        <div style={{ fontSize: 14, color: colors.violet, marginTop: 24 }}>
          Laptop warranty · Page 1
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontSize: 13,
          color: colors.muted,
        }}
      >
        Local model / on device
      </div>
    </div>
  );
};
