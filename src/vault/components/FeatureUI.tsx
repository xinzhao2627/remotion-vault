import type { CSSProperties, ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Document, progress } from "./Film";

export const Surface = ({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: ReactNode;
  dark?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: dark ? "#15121b" : "#faf9fc",
      color: dark ? "white" : colors.ink,
      padding: "57px 23px 22px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        fontSize: 29,
        letterSpacing: "-0.04em",
        fontWeight: 600,
        marginBottom: 25,
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

export const Button = ({
  children,
  active = false,
  style,
}: {
  children: ReactNode;
  active?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      padding: "12px 16px",
      borderRadius: 16,
      fontSize: 17,
      backgroundColor: active ? colors.violet : "#eeebf4",
      color: active ? "white" : colors.violet,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const PagePreview = ({
  title = "Laptop warranty",
  enhanced = false,
  style,
}: {
  title?: string;
  enhanced?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "relative",
      height: 340,
      backgroundColor: enhanced ? "white" : "#e7e3dd",
      borderRadius: 7,
      border: "1px solid #ddd7e7",
      padding: "32px 23px",
      boxSizing: "border-box",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        fontSize: 25,
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.04em",
        marginBottom: 25,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 23 }}>
      Coverage period
      <br />
      Two years from purchase.
    </div>
    <div
      style={{
        height: 3,
        width: "90%",
        backgroundColor: enhanced ? "#90829f" : "#aaa6a0",
        marginBottom: 12,
      }}
    />
    <div
      style={{
        height: 3,
        width: "78%",
        backgroundColor: enhanced ? "#c1b8cc" : "#bbb7b1",
        marginBottom: 12,
      }}
    />
    <div
      style={{
        height: 3,
        width: "93%",
        backgroundColor: enhanced ? "#c1b8cc" : "#bbb7b1",
        marginBottom: 12,
      }}
    />
    <div style={{ fontSize: 13, marginTop: 28, color: colors.muted }}>
      Keep with your receipt.
    </div>
  </div>
);

export const ScanUI = ({
  kind = "scan",
}: {
  kind?: "scan" | "crop" | "rotate" | "filter" | "pages" | "imports";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, 0.2 * fps, 0.9 * fps);
  if (kind === "imports")
    return (
      <Surface title="Bring it into Vault">
        <div style={{ fontSize: 16, color: colors.muted, marginBottom: 35 }}>
          From your device
        </div>
        <Button style={{ marginBottom: 18 }}>Import Image</Button>
        <Button active>Import PDF</Button>
        <div
          style={{
            marginTop: 48,
            padding: 22,
            borderRadius: 16,
            backgroundColor: "white",
            fontSize: 20,
            opacity: p,
          }}
        >
          Laptop warranty
          <br />
          <span style={{ fontSize: 14, color: colors.violet }}>
            Ready to save
          </span>
        </div>
      </Surface>
    );
  if (kind === "pages")
    return (
      <Surface title="Multi-page scan">
        <PagePreview enhanced style={{ height: 335 }} />
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <Button>Page 1</Button>
          <Button active>Page 2</Button>
        </div>
        <div style={{ marginTop: 22, fontSize: 17, color: colors.violet }}>
          Save as one PDF
        </div>
      </Surface>
    );
  return (
    <Surface
      title={
        kind === "scan"
          ? "Scan a page"
          : kind === "crop"
            ? "Shape the crop"
            : kind === "rotate"
              ? "Rotate"
              : "Enhance"
      }
    >
      <div
        style={{
          position: "relative",
          height: 375,
          backgroundColor: "#e2dfe6",
          padding: 17,
          boxSizing: "border-box",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <PagePreview
          enhanced={kind === "filter" && p > 0.45}
          style={{
            height: 340,
            rotate:
              kind === "rotate"
                ? `${-90 * (1 - p)}deg`
                : kind === "scan"
                  ? "-4deg"
                  : "0deg",
            scale: kind === "rotate" ? 0.76 + p * 0.24 : 1,
          }}
        />
        {kind === "scan" || kind === "crop" ? (
          <div
            style={{
              position: "absolute",
              inset: 17 + (kind === "crop" ? p * 14 : 0),
              border: "2px solid #6650a4",
              borderRadius: 5,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -6,
                top: -6,
                width: 13,
                height: 13,
                backgroundColor: colors.violet,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -6,
                top: -6,
                width: 13,
                height: 13,
                backgroundColor: colors.violet,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -6,
                bottom: -6,
                width: 13,
                height: 13,
                backgroundColor: colors.violet,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -6,
                bottom: -6,
                width: 13,
                height: 13,
                backgroundColor: colors.violet,
              }}
            />
          </div>
        ) : null}
        {kind === "filter" ? (
          <div
            style={{
              position: "absolute",
              left: 17,
              right: 17,
              bottom: 20,
              textAlign: "center",
              color: colors.violet,
              fontSize: 16,
            }}
          >
            {p > 0.45 ? "Auto enhancement" : "Original"}
          </div>
        ) : null}
      </div>
      <div style={{ marginTop: 24 }}>
        <Button active>
          {kind === "scan" ? "Capture" : kind === "filter" ? "Auto" : "Done"}
        </Button>
      </div>
      {kind === "filter" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 18,
            color: colors.muted,
            fontSize: 13,
          }}
        >
          <span>Original</span>
          <span>Grayscale</span>
          <span>Auto</span>
        </div>
      ) : null}
    </Surface>
  );
};

export const FolderUI = ({
  kind,
}: {
  kind: "create" | "save" | "rename" | "library";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = progress(frame, 0.25 * fps, 1.1 * fps);
  const name = kind === "create" ? "Study" : "Laptop warranty";
  const typed = name.slice(
    0,
    Math.min(name.length, Math.max(0, Math.floor(frame * 0.8))),
  );
  if (kind === "library")
    return (
      <Surface title="Study">
        <div style={{ fontSize: 16, color: colors.muted, marginBottom: 28 }}>
          Your documents
        </div>
        <FolderRow title="Laptop warranty" detail="PDF / Text ready" />
        <FolderRow title="Course notes" detail="PDF / Text ready" />
        <FolderRow title="Reference image" detail="Image" />
      </Surface>
    );
  return (
    <Surface title={kind === "save" ? "Save Document" : "Vault"}>
      <div style={{ fontSize: 17, color: colors.muted, marginBottom: 25 }}>
        {kind === "save" ? "Document title" : "Your personal library"}
      </div>
      <div
        style={{
          padding: 18,
          backgroundColor: "white",
          border: "1px solid #d6cde5",
          borderRadius: 12,
          fontSize: 20,
          marginBottom: 28,
        }}
      >
        {kind === "save"
          ? "Laptop warranty"
          : kind === "create"
            ? "Work"
            : "Scan_001"}
      </div>
      <div
        style={{
          padding: 23,
          backgroundColor: "#f0edf5",
          borderRadius: 21,
          boxShadow: "0 12px 36px rgba(40,25,60,0.08)",
          translate: `0px ${(1 - p) * 16}px`,
          opacity: p,
        }}
      >
        <div style={{ fontSize: 23, fontWeight: 600, marginBottom: 28 }}>
          {kind === "create"
            ? "New Folder"
            : kind === "save"
              ? "Destination folder"
              : "Rename Document"}
        </div>
        <div
          style={{
            padding: "14px 0",
            borderBottom: "2px solid #6650a4",
            fontSize: 20,
            minHeight: 25,
            marginBottom: 27,
          }}
        >
          {kind === "save" ? "Study" : typed}
          <span style={{ color: colors.violet }}>
            {p < 1 && kind !== "save" ? "|" : ""}
          </span>
        </div>
        <Button active>
          {kind === "create" ? "Create" : kind === "save" ? "Save" : "Rename"}
        </Button>
      </div>
      <div
        style={{
          fontSize: 17,
          color: colors.violet,
          marginTop: 35,
          opacity: progress(frame, 1.1 * fps, 1.6 * fps),
        }}
      >
        {kind === "create"
          ? "Folder created"
          : kind === "save"
            ? "Saved in Study"
            : "Document renamed"}
      </div>
    </Surface>
  );
};

const FolderRow = ({ title, detail }: { title: string; detail: string }) => (
  <div style={{ padding: "23px 0", borderBottom: "1px solid #e1dce9" }}>
    <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.035em" }}>
      {title}
    </div>
    <div style={{ fontSize: 14, color: colors.violet, marginTop: 10 }}>
      {detail}
    </div>
  </div>
);

export const ReaderUI = ({ kind }: { kind: "pdf" | "image" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pageTwo = kind === "pdf" && frame > 1.25 * fps;
  const zoom = kind === "image" ? progress(frame, 0.3 * fps, 1.8 * fps) : 0;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <div
        style={{ position: "absolute", inset: "0 0 85px", overflow: "hidden" }}
      >
        <div
          style={{
            height: "100%",
            scale: 1 + zoom * 0.7,
            translate: `${zoom * 75}px ${-zoom * 115}px`,
            transformOrigin: "18% 48%",
          }}
        >
          <Document
            title={
              pageTwo
                ? "Warranty\nconditions"
                : kind === "image"
                  ? "Purchase\nreceipt"
                  : "Laptop\nwarranty"
            }
            section={pageTwo ? "How to claim" : "Coverage period"}
            body={
              pageTwo
                ? "Keep your purchase record. Refer to these conditions when requesting support."
                : undefined
            }
            highlight={kind === "image"}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          backgroundColor: "#eeeaf4",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          color: colors.violet,
          fontSize: 26,
        }}
      >
        {kind === "pdf" ? (
          <>
            <span>Previous</span>
            <span>Page {pageTwo ? 2 : 1} of 2</span>
            <span>Next</span>
          </>
        ) : (
          <>
            <span>Image viewer</span>
            <span>Pinch to zoom / Pan</span>
          </>
        )}
      </div>
    </div>
  );
};

export const TextUI = ({
  kind,
}: {
  kind: "extract" | "edit" | "save" | "menu";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const changed =
    kind === "save" ||
    kind === "menu" ||
    (kind === "edit" && frame > 0.8 * fps);
  const text = changed
    ? "Your laptop is covered for two years from the purchase date."
    : "Your laptop is covered for two yeers from the purchase date.";
  const modified =
    (kind === "edit" && changed) || (kind === "save" && frame < 0.4 * fps);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#faf9fc",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          marginBottom: 28,
        }}
      >
        <span>Page 1</span>
        <span style={{ color: colors.violet }}>
          {kind === "save" || kind === "menu" ? "User Edited" : "Original OCR"}
        </span>
      </div>
      <div
        style={{
          padding: 30,
          border: "1px solid #cfc5df",
          borderRadius: 15,
          fontSize: 38,
          lineHeight: 1.45,
          letterSpacing: "-0.035em",
          minHeight: 190,
          backgroundColor: "white",
        }}
      >
        {kind === "extract" ? (
          text.slice(
            0,
            Math.min(text.length, Math.max(0, Math.floor(frame * 1.6))),
          )
        ) : kind === "edit" ? (
          <>
            Your laptop is covered for two{" "}
            <span
              style={{
                backgroundColor: "#e9defb",
                borderRadius: 4,
                padding: "2px 5px",
              }}
            >
              {changed ? "years" : "yeers"}
            </span>{" "}
            from the purchase date.
          </>
        ) : (
          text
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: 17,
          justifyContent: "flex-end",
          marginTop: 26,
        }}
      >
        {modified ? <Button>Reset</Button> : null}
        <Button active={modified} style={{ opacity: modified ? 1 : 0.45 }}>
          Save Page
        </Button>
      </div>
      {kind === "save" ? (
        <div
          style={{
            fontSize: 25,
            marginTop: 35,
            color: colors.violet,
            opacity: progress(frame, 0, 0.4 * fps),
          }}
        >
          Text updated
        </div>
      ) : null}
      {kind === "menu" ? (
        <div
          style={{
            position: "absolute",
            right: 35,
            top: 75,
            padding: "25px 35px",
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow: "0 12px 45px rgba(40,20,60,0.15)",
            fontSize: 25,
            lineHeight: 2,
          }}
        >
          Re-run OCR
          <br />
          Delete Extracted Text
        </div>
      ) : null}
    </div>
  );
};

export const ScopeUI = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const selected = frame > 0.8 * fps;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#faf9fc",
        padding: "48px 58px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 47,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          marginBottom: 42,
        }}
      >
        Vault chat
      </div>
      <div style={{ fontSize: 29, color: colors.violet, marginBottom: 30 }}>
        Search: {selected ? "Study" : "All documents"}
      </div>
      <div
        style={{
          padding: 30,
          width: 540,
          borderRadius: 20,
          boxShadow: "0 15px 60px rgba(40,20,60,0.12)",
          backgroundColor: "white",
          fontSize: 31,
          lineHeight: 2.1,
        }}
      >
        <div>All documents</div>
        <div
          style={{
            backgroundColor: selected ? "#e9e1f6" : "transparent",
            borderRadius: 10,
            padding: "0 15px",
          }}
        >
          Folder: Study
        </div>
        <div>Laptop warranty</div>
      </div>
      <div style={{ fontSize: 25, color: colors.violet, marginTop: 40 }}>
        Use local model
      </div>
    </div>
  );
};

export const AnswerUI = ({ quick = false }: { quick?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const answer = quick ? 1 : progress(frame, 0.8 * fps, 1.5 * fps);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "42px 58px",
        backgroundColor: "#faf9fc",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 25, color: colors.violet, marginBottom: 32 }}>
        Search: Study / Local model
      </div>
      <div
        style={{
          fontSize: 44,
          lineHeight: 1.2,
          letterSpacing: "-0.04em",
          marginBottom: 46,
        }}
      >
        How long is the laptop warranty?
      </div>
      <div style={{ opacity: answer, translate: `0px ${(1 - answer) * 16}px` }}>
        <div style={{ fontSize: 21, color: colors.muted, marginBottom: 24 }}>
          Local model answer
        </div>
        <div
          style={{
            fontSize: 57,
            lineHeight: 1.13,
            letterSpacing: "-0.05em",
            fontWeight: 600,
          }}
        >
          Your warranty lasts two years.
        </div>
        <div
          style={{
            marginTop: 44,
            padding: "18px 26px",
            backgroundColor: "#e9e1f6",
            color: colors.violet,
            borderRadius: 14,
            fontSize: 25,
          }}
        >
          Laptop warranty / Page 1
        </div>
      </div>
    </div>
  );
};
