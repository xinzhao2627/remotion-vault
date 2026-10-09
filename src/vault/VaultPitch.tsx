import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import {
  AbsoluteFill,
  Composition,
  Folder,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { fontFamily } from "../design/fonts";
import { objectTransition } from "./transitions";
import { MoreToVault } from "./scenes/MoreToVault";
import { RefineExtras, OrganizeExtras } from "./scenes/FeatureExtras";
import { FeatureIntro } from "./scenes/FeatureIntro";
import { CaptureTools } from "./scenes/CaptureTools";
import { Organize } from "./scenes/Organize";
import { ReadInspect } from "./scenes/ReadInspect";
import { TextControl } from "./scenes/TextControl";
import { ScopedAnswer } from "./scenes/ScopedAnswer";
import { Offline } from "./scenes/Offline";
import { Pipeline } from "./scenes/Pipeline";
import { Closing } from "./scenes/Closing";
import { Hook } from "./scenes/Hook";
import { Reveal } from "./scenes/Reveal";
import { Recognition } from "./scenes/Recognition";
import { Answer } from "./scenes/Answer";
import { Source } from "./scenes/Source";
import type { FeatureClip } from "./components/FeatureMedia";

const cameraSchema = z
  .object({
    zoom: z.number().min(0.5).max(4),
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
  })
  .default({ zoom: 1, x: 0.5, y: 0.5 });
const clipSchema = z
  .object({
    file: z.string().default(""),
    trimSeconds: z.number().min(0).default(0),
    camera: cameraSchema,
    holdAfterSeconds: z.number().min(0).nullable().default(null),
  })
  .default({
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  });
const featureFieldsSchema = z.object({
  scan: clipSchema,
  crop: clipSchema,
  rotate: clipSchema,
  filter: clipSchema,
  pages: clipSchema,
  reorderPages: clipSchema,
  imports: clipSchema,
  createFolder: clipSchema,
  saveFolder: clipSchema,
  rename: clipSchema,
  library: clipSchema,
  pdfPages: clipSchema,
  imageZoom: clipSchema,
  ocr: clipSchema,
  editText: clipSchema,
  saveText: clipSchema,
  ocrMenu: clipSchema,
  scope: clipSchema,
  answer: clipSchema,
  source: clipSchema,
  referencePage: clipSchema,
});
const featuresSchema = featureFieldsSchema.default({
  scan: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  crop: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  rotate: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  filter: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  pages: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  reorderPages: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  imports: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  createFolder: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  saveFolder: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  rename: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  library: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  pdfPages: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  imageZoom: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  ocr: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  editText: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  saveText: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  ocrMenu: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  scope: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  answer: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  source: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
  referencePage: {
    file: "",
    trimSeconds: 0,
    camera: { zoom: 1, x: 0.5, y: 0.5 },
    holdAfterSeconds: null,
  },
});
const pitchSchema = z.object({
  features: featuresSchema,
  libraryClip: z.string(),
  libraryTrimSeconds: z.number().min(0),
  libraryCamera: cameraSchema,
  recognitionClip: z.string(),
  recognitionTrimSeconds: z.number().min(0),
  recognitionCamera: cameraSchema,
  answerClip: z.string(),
  answerTrimSeconds: z.number().min(0),
  answerCamera: cameraSchema,
  sourceClip: z.string(),
  sourceTrimSeconds: z.number().min(0),
  sourceCamera: cameraSchema,
  offlineClip: z.string(),
  offlineTrimSeconds: z.number().min(0),
  offlineCamera: cameraSchema,
  narrationFile: z.string(),
  musicFile: z.string(),
  showReviewNotes: z.boolean(),
});
type PitchProps = z.infer<typeof pitchSchema>;
const captureSchema = featureFieldsSchema.pick({
  scan: true,
  crop: true,
  rotate: true,
  filter: true,
  pages: true,
  imports: true,
});
const organizeSchema = featureFieldsSchema.pick({
  createFolder: true,
  saveFolder: true,
  rename: true,
  library: true,
});
const readSchema = featureFieldsSchema.pick({
  pdfPages: true,
  imageZoom: true,
});
const textSchema = featureFieldsSchema
  .pick({
    ocr: true,
    editText: true,
    saveText: true,
    ocrMenu: true,
  })
  .extend({ reference: clipSchema });
const scopedSchema = featureFieldsSchema.pick({
  scope: true,
  answer: true,
  source: true,
});

const extrasSchema = z.object({
  anchor: clipSchema,
  first: clipSchema,
  second: clipSchema,
  third: clipSchema,
});

const narrationCues = [
  { from: 0, to: 120, text: "Your documents hold answers." },
  {
    from: 120,
    to: 240,
    text: "Meet Vault. Personal document intelligence, right on your phone.",
  },
  {
    from: 240,
    to: 420,
    text: "Capture a page. Recognize its text on your device.",
  },
  {
    from: 420,
    to: 690,
    text: "Ask about your documents. Local AI turns relevant information into an answer.",
  },
  { from: 690, to: 840, text: "Open the original page behind the answer." },
  { from: 840, to: 900, text: "And there's more." },
  { from: 900, to: 990, text: "Crop, enhance, and arrange pages." },
  { from: 990, to: 1080, text: "Create folders. Rename files. Edit text." },
  {
    from: 1080,
    to: 1290,
    text: "Your information stays with you, even offline.",
  },
  {
    from: 1290,
    to: 1530,
    text: "On-device embeddings. Local vector indexing. No cloud inference. No monthly AI API fees.",
  },
  {
    from: 1530,
    to: 1650,
    text: "Vault. Your documents. Your intelligence. Your device.",
  },
];

export const VaultPitch = (props: PitchProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // Parse partial feature inputs to fill missing source slots safely.
  const features = featuresSchema.parse(props.features);
  const library: FeatureClip =
    features.library.file || !props.libraryClip
      ? features.library
      : {
          ...features.library,
          file: props.libraryClip,
          trimSeconds: props.libraryTrimSeconds,
          camera: props.libraryCamera,
        };
  const ocr: FeatureClip =
    features.ocr.file || !props.recognitionClip
      ? features.ocr
      : {
          ...features.ocr,
          file: props.recognitionClip,
          trimSeconds: props.recognitionTrimSeconds,
          camera: props.recognitionCamera,
        };
  const answer: FeatureClip =
    features.answer.file || !props.answerClip
      ? features.answer
      : {
          ...features.answer,
          file: props.answerClip,
          trimSeconds: props.answerTrimSeconds,
          camera: props.answerCamera,
        };
  const source: FeatureClip =
    features.source.file || !props.sourceClip
      ? features.source
      : {
          ...features.source,
          file: props.sourceClip,
          trimSeconds: props.sourceTrimSeconds,
          camera: props.sourceCamera,
        };
  const cue = narrationCues.find(
    (item) => frame >= item.from && frame < item.to,
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f5f7", fontFamily }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="The document promise"
          durationInFrames={130}
          premountFor={fps}
        >
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("document")}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence
          name="Meet Vault"
          durationInFrames={132}
          premountFor={fps}
        >
          <Reveal
            file={library.file}
            trimSeconds={library.trimSeconds}
            camera={library.camera}
            holdAfterSeconds={library.holdAfterSeconds}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("push")}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="On-device recognition"
          durationInFrames={190}
          premountFor={fps}
        >
          <Recognition
            file={ocr.file}
            trimSeconds={ocr.trimSeconds}
            camera={ocr.camera}
            holdAfterSeconds={ocr.holdAfterSeconds}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("passage")}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence
          name="Ask your documents"
          durationInFrames={282}
          premountFor={fps}
        >
          <Answer
            file={answer.file}
            trimSeconds={answer.trimSeconds}
            camera={answer.camera}
            holdAfterSeconds={answer.holdAfterSeconds}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("citation")}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Open the source"
          durationInFrames={150}
          premountFor={fps}
        >
          <Source
            file={source.file}
            trimSeconds={source.trimSeconds}
            camera={source.camera}
            holdAfterSeconds={source.holdAfterSeconds}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="There is more to Vault"
          durationInFrames={68}
          premountFor={fps}
        >
          <MoreToVault />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("resolve")}
          timing={linearTiming({ durationInFrames: 8 })}
        />
        <TransitionSeries.Sequence
          name="Extra tools for your scans"
          durationInFrames={90}
          premountFor={fps}
        >
          <RefineExtras
            anchor={features.pages}
            first={features.crop}
            second={features.filter}
            third={features.reorderPages}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Extra tools for your library"
          durationInFrames={90}
          premountFor={fps}
        >
          <OrganizeExtras
            anchor={library}
            first={features.createFolder}
            second={features.rename}
            third={features.editText}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="Offline proof"
          durationInFrames={222}
          premountFor={fps}
        >
          <Offline
            file={props.offlineClip}
            trimSeconds={props.offlineTrimSeconds}
            camera={props.offlineCamera}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("interior")}
          timing={linearTiming({ durationInFrames: 12 })}
        />
        <TransitionSeries.Sequence
          name="Your local intelligence"
          durationInFrames={256}
          premountFor={fps}
        >
          <Pipeline />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={objectTransition("resolve")}
          timing={linearTiming({ durationInFrames: 16 })}
        />
        <TransitionSeries.Sequence
          name="Closing identity"
          durationInFrames={120}
          premountFor={fps}
        >
          <Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {props.narrationFile ? (
        <Audio
          name="Narration"
          src={staticFile(props.narrationFile)}
          durationInFrames={durationInFrames}
          premountFor={fps}
        />
      ) : null}
      {props.musicFile ? (
        <Audio
          name="Pitch music"
          src={staticFile(props.musicFile)}
          durationInFrames={durationInFrames}
          premountFor={fps}
          volume={interpolate(
            frame,
            [
              0,
              0.5 * fps,
              35.6 * fps,
              36 * fps,
              42.5 * fps,
              43 * fps,
              durationInFrames - 1.5 * fps,
              durationInFrames - 1,
            ],
            [0, 0.16, 0.16, 0.04, 0.04, 0.16, 0.16, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}
        />
      ) : null}
      {props.showReviewNotes ? (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 88,
            backgroundColor: "white",
            borderTop: "1px solid #e5e5e9",
            display: "flex",
            alignItems: "center",
            gap: 25,
            padding: "0 45px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 17, color: "#74747c", whiteSpace: "nowrap" }}>
            Narration cue
          </div>
          <div style={{ fontSize: 22, color: "#1d1d1f", flex: 1 }}>
            {cue?.text}
          </div>
          <div style={{ fontSize: 15, color: "#74747c", whiteSpace: "nowrap" }}>
            {props.narrationFile ? "Voice loaded" : "Voice pending"}
            <br />
            {props.musicFile ? "Music loaded" : "Music pending"}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
export const VaultPitchCompositions = () => (
  <>
    <Composition
      id="VaultPitch"
      component={VaultPitch}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1650}
      schema={pitchSchema}
      defaultProps={{
        libraryClip: "",
        libraryTrimSeconds: 0,
        libraryCamera: { zoom: 1, x: 0.5, y: 0.5 },
        recognitionClip: "",
        recognitionTrimSeconds: 0,
        recognitionCamera: { zoom: 1, x: 0.5, y: 0.5 },
        answerClip: "",
        answerTrimSeconds: 0,
        answerCamera: { zoom: 1, x: 0.5, y: 0.5 },
        sourceClip: "",
        sourceTrimSeconds: 0,
        sourceCamera: { zoom: 1, x: 0.5, y: 0.5 },
        offlineClip: "",
        offlineTrimSeconds: 0,
        offlineCamera: { zoom: 1, x: 0.5, y: 0.5 },
        narrationFile: "",
        musicFile: "",
        showReviewNotes: false,
        features: {
          scan: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          crop: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          rotate: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          filter: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          pages: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          reorderPages: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          imports: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          createFolder: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          saveFolder: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          rename: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          library: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          pdfPages: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          imageZoom: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          ocr: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          editText: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          saveText: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          ocrMenu: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          scope: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          answer: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          source: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          referencePage: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        },
      }}
    />
    <Folder name="Vault-Scenes">
      <Composition
        id="VaultMore"
        component={MoreToVault}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={68}
      />
      <Composition
        id="VaultRefineExtras"
        component={RefineExtras}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={90}
        schema={extrasSchema}
        defaultProps={{
          anchor: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          first: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          second: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          third: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultOrganizeExtras"
        component={OrganizeExtras}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={90}
        schema={extrasSchema}
        defaultProps={{
          anchor: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          first: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          second: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          third: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultOffline"
        component={Offline}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={222}
        defaultProps={{
          file: "",
          trimSeconds: 0,
          camera: { zoom: 1, x: 0.5, y: 0.5 },
        }}
      />
      <Composition
        id="VaultPipeline"
        component={Pipeline}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={256}
      />
      <Composition
        id="VaultClosing"
        component={Closing}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={120}
      />
    </Folder>
    <Folder name="Vault-Feature-Reel-Studies">
      <Composition
        id="VaultFeatureIntro"
        component={FeatureIntro}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={98}
      />
      <Composition
        id="VaultCapture"
        component={CaptureTools}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={282}
        schema={captureSchema}
        defaultProps={{
          scan: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          crop: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          rotate: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          filter: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          pages: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          imports: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultOrganize"
        component={Organize}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={250}
        schema={organizeSchema}
        defaultProps={{
          createFolder: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          saveFolder: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          rename: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          library: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultReadInspect"
        component={ReadInspect}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={190}
        schema={readSchema}
        defaultProps={{
          pdfPages: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          imageZoom: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultTextControl"
        component={TextControl}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={220}
        schema={textSchema}
        defaultProps={{
          reference: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          ocr: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          editText: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          saveText: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          ocrMenu: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
      <Composition
        id="VaultScopedAnswer"
        component={ScopedAnswer}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={330}
        schema={scopedSchema}
        defaultProps={{
          scope: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          answer: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
          source: {
            file: "",
            trimSeconds: 0,
            camera: { zoom: 1, x: 0.5, y: 0.5 },
            holdAfterSeconds: null,
          },
        }}
      />
    </Folder>
    <Folder name="Vault-Story-Scenes">
      <Composition
        id="VaultHook"
        component={Hook}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={130}
      />
      <Composition
        id="VaultReveal"
        component={Reveal}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={132}
        defaultProps={{
          file: "",
          trimSeconds: 0,
          camera: { zoom: 1, x: 0.5, y: 0.5 },
        }}
      />
      <Composition
        id="VaultRecognition"
        component={Recognition}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={190}
        defaultProps={{
          file: "",
          trimSeconds: 0,
          camera: { zoom: 1, x: 0.5, y: 0.5 },
        }}
      />
      <Composition
        id="VaultAnswer"
        component={Answer}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={282}
        defaultProps={{
          file: "",
          trimSeconds: 0,
          camera: { zoom: 1, x: 0.5, y: 0.5 },
        }}
      />
      <Composition
        id="VaultSource"
        component={Source}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={150}
        defaultProps={{
          file: "",
          trimSeconds: 0,
          camera: { zoom: 1, x: 0.5, y: 0.5 },
        }}
      />
    </Folder>
  </>
);
