# Vault recording slots

The current master is the 55-second story-led pitch with a short feature interlude. Put recordings in this directory and reference their paths relative to `public/`.

## Main story

Existing fields remain supported:

| Prop              | Current film window    |
| ----------------- | ---------------------- |
| `libraryClip`     | 4-8 s, product reveal  |
| `recognitionClip` | 8-14 s, OCR            |
| `answerClip`      | 14-23 s, local answer  |
| `sourceClip`      | 23-28 s, original page |
| `offlineClip`     | 36-43 s, offline proof |

Each has a corresponding `TrimSeconds` field and `Camera` object. For example, `answerTrimSeconds` and `answerCamera`. Default camera: `{zoom: 1, x: 0.5, y: 0.5}`. Increasing zoom crops into the source; normalized x/y choose the zoom origin.

The matching `features.library`, `features.ocr`, `features.answer`, and `features.source` objects override the old story fields when their `file` values are set. These feature objects also support optional frame holds.

## Feature interlude

Two groups show three extra capabilities and a fourth contextual phone:

| Source object           | Film window | View                        |
| ----------------------- | ----------- | --------------------------- |
| `features.pages`        | 30-33 s     | Multi-page document context |
| `features.crop`         | 30-33 s     | Crop                        |
| `features.filter`       | 30-33 s     | Enhance                     |
| `features.reorderPages` | 30-33 s     | Arrange scanned pages       |
| `features.library`      | 33-36 s     | Library context             |
| `features.createFolder` | 33-36 s     | Create folder               |
| `features.rename`       | 33-36 s     | Rename document             |
| `features.editText`     | 33-36 s     | Edit extracted text         |

Page ordering, crop, and filters are scanner tools used before saving the resulting PDF. Prepare a short, complete action for each three-second group. The contextual phone can reuse a document/library recording. Use a coherent corpus and titles throughout.

Each source object has this shape:

```json
{
  "file": "assets/vault/crop.mp4",
  "trimSeconds": 4.5,
  "camera": { "zoom": 1, "x": 0.5, "y": 0.5 },
  "holdAfterSeconds": null
}
```

`trimSeconds` chooses the source in-point. `holdAfterSeconds` is relative to playback after the trim. A value of 1 plays one second of the trimmed recording, then holds that frame while the scene continues. Null plays normally. Choose a hold before the source ends. Zero can provide a still context view. These controls work in both the story recordings and feature inserts.

Leave file values empty to show labeled illustrations. A supplied path must exist and should not include `public/`. The media layer preserves aspect ratio; adjust crop/zoom and transition anchors after receiving actual footage. Frame holds are intentional editorial controls, not automatic action detection.

The expanded feature-reel source objects remain available for individual studies, but fields such as `features.imports`, `features.pdfPages`, and `features.scope` are not shown in the current master. Those studies are in `Vault-Feature-Reel-Studies`.

## Audio and review

`narrationFile` and `musicFile` take paths relative to public/. Leave them empty for a silent preview. Narration cues follow the new story timing. The draft music envelope dips at the offline proof; final mixing remains an editorial pass.

`showReviewNotes` is false by default. Turn it on to inspect the narration cue footer. Placeholders remain identified until their footage is supplied. Standalone compositions have their own defaults; master inputs do not automatically copy into their props.
