# Vault motion redesign plan

Status: visual redesign implemented in `VaultPitch`. Real recordings, final narration, and music remain pending production assets.

Implemented: eight scene-specific layouts; layered document opening; centered product reveal; animated recognition and answer stand-ins; source close-up; a hard-cut offline scene; clustered vector animation; and staggered closing typography. Six custom transitions use document/screen masks, a passage wipe, citation expansion, device interior reveal, and a closing iris. The master remains 1740 frames at 30 fps (58 seconds). Review annotations are off by default. All five recording slots retain replacement and trim controls, with new per-slot camera controls.

## Direction

Make Vault feel like a filmed product launch through distinctive shot compositions, continuity between objects, and an intentional audio rhythm. Keep the approved story, completed vector-enabled product scope, replaceable recordings, 1920 x 1080 output, and 58-second target.

The current draft has three structural sources of repetition: most scenes use `Stage` with the same left headline and right phone; headlines share identical entrances; all seven transitions are six-frame fades. The reusable shell is useful for a storyboard but constrains the final art direction.

The signature visual idea is **a document becoming an answer inside your device**. A page, highlighted passage, source reference, and device boundary carry attention from shot to shot. Scene changes should follow that idea rather than function as independent slide entrances.

## Design system

- Canvas: near-white `#f5f5f7` for clarity and product demonstration.
- Dark canvas: black `#000000` for the opening, offline contrast, and architecture climax.
- Text: graphite `#1d1d1f` on light scenes; white `#ffffff` on dark scenes.
- Brand accent: Vault's existing violet `#6650a4`, with `#b5a2e3` for readable accents on black.
- Typography: local Inter, with deliberate size changes between a full-frame opening, restrained demo captions, and a large closing wordmark. Avoid repeating a headline/body pair in every shot.
- Motion: decisive movement followed by stable reading time. Use gentle depth for establishing shots, and front-facing UI for proof shots. Keep a shared easing family while varying travel, scale, and timing.

## Revised scene treatments

| Time    | Composition and action                                                                                                                                                                                                                                               | Transition into the next scene                                                                                                           |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 0-5 s   | **Document opening.** On black, three recognizable document forms move through shallow depth. One comes forward as the short hook resolves. Typography occupies the frame; no permanent phone column.                                                                | The selected page aligns to the phone screen's rectangle. A shape-matched reveal turns that document into Vault's screen.                |
| 5-10 s  | **Product hero.** Vault and a large centered phone emerge on a light studio canvas. A slight three-quarter view settles into a straight-on view. Keep the product name brief and prominent.                                                                          | Push through the phone screen into the document capture. The outgoing screen and incoming document share an anchor and scale.            |
| 10-18 s | **Recognition close-up.** The document fills most of the frame. A precise highlight follows the relevant text; recognized text appears beside it. A small phone edge or brief pullback establishes that the action is on-device.                                     | A highlighted text strip provides a horizontal wipe into the question field. This connects the document's content with asking about it.  |
| 18-30 s | **Answer demonstration.** Start close on the question, then reveal the answer and its source reference. Move the framing through two clear stages rather than holding the same phone silhouette for twelve seconds. Use the actual recording crop once supplied.     | Track toward the source reference. Its bounding rectangle expands into the cited page, maintaining the viewer's focus.                   |
| 30-36 s | **Source reveal.** A large source page becomes the main image; the answer appears briefly as a smaller contextual companion. Hold the supporting passage long enough to read.                                                                                        | A clean, decisive cut to black, synchronized to a connectivity-off action and a short reduction in the music.                            |
| 36-44 s | **Offline contrast.** A centered, front-facing phone on black. Show the real connectivity-off and fresh-answer footage when available. The short line “Even offline.” appears after the proof action, with unusually quiet motion.                                   | The phone's screen boundary expands into a view of the processing inside the device. The device outline stays spatially consistent.      |
| 44-52 s | **Vector/RAG climax.** Recognized text becomes discrete chunks, then an organized embedding field. Relevant chunks highlight, feed local AI, and resolve into one answer. Everything remains visibly inside the device boundary. Benefits arrive in two short beats. | The result contracts into a small focal point while the device recedes. A masked reveal brings in the Vault wordmark at the same center. |
| 52-58 s | **Closing identity.** The wordmark resolves on a clean canvas. The final promise arrives with a controlled delay, followed by a quiet hold and a music resolution.                                                                                                   | End hold with a subtle final audio fade.                                                                                                 |

The architecture animation is a conceptual explanation, not a claim to visualize measured vectors or actual model internals. The completed feature set follows the user's requested assumption.

## How repetition becomes intentional

Repeat the rounded document/screen boundary at the product reveal and offline-to-pipeline transition. In the first use it contains the product; in the later use it reveals the intelligence inside. The viewer recognizes the shape while its meaning develops.

Repeat a short violet highlight when text is recognized, a source is selected, and evidence is retrieved. It should always indicate relevant information. This creates a visual vocabulary that belongs to Vault.

Use a rhythm of wide product view, document close-up, UI close-up, source page, centered offline proof, and abstract pipeline. Adjacent scenes should differ in at least two of focal position, scale, depth, contrast, or motion rhythm.

## Placeholder treatment

Replace the current identical instruction cards with scene-specific stand-ins: a library composition, a page/text comparison, a question/answer composition, a source-page view, and an offline proof composition. Animate these to approximate the intended editorial beats while keeping them explicitly marked as placeholders in review mode.

Keep actual recordable regions separate from editorial overlays. When real clips arrive, replace the media layer and align its crops and highlights to the recorded actions. Do not draw unrelated UI over the final recordings or hide important source context.

Make recording instructions available in the review overlay or asset guide rather than filling the product frame with paragraphs. Hide the fixed review footer by default in the presentation preview; retain a review toggle. Label pending media subtly so the preview's status stays clear.

## Implementation sequence

1. **Composition study.** Design keyframes for the document opening, product reveal, recognition, answer, offline, pipeline, and closing. Check the sequence as a contact sheet before building motion. The frames should already look distinct when paused.
2. **Scene refactor.** Reduce `Stage` to shared typography/font/color utilities or retire its fixed layout. Give each scene its own authored composition. Split `RecordingSlot` into a reusable media layer and optional device shell so recordings can appear inside a phone, enlarged, or in a source-page view.
3. **Continuity controls.** Add editable normalized focal rectangles, crop/zoom controls, and source-time controls to recording scenes. Define the positions of important objects at incoming/outgoing boundaries. Keep transforms for footage and its callouts in one group.
4. **Transition choreography.** Replace blanket fades with custom shape reveals, screen push-ins, passage wipes, citation expansions, the offline cut, and the closing reveal. Use authored motion inside scenes for object continuity and custom transition presentations where whole-scene masking is appropriate. Preserve independent timeline editing.
5. **Narration and music pass.** Lock a voice take before the final timing pass. Build the soundtrack through the demo, briefly reduce it at the offline cut, then return with a controlled lift for the pipeline. Reserve the strongest musical resolution for the ending. Accent meaningful actions instead of adding a whoosh to every cut.
6. **Footage integration.** Swap the placeholder media, retime actions, and adjust crop anchors. Preserve readable holds. Recheck the pacing after real processing time and narration are incorporated.
7. **Verification.** Check the beginning, middle, and ending of every transition; each scene at playback size; the continuity of document/answer/source; and legibility after camera movements settle. Run project checks. Confirm runtime remains under 60 seconds, including the closing hold and audio tail. Keep the deliverable in Studio until an export is requested.

## Timing budget

Keep the approved net scene boundaries at 0, 5, 10, 18, 30, 36, 44, 52, and 58 seconds. Initial transition budgets at 30 fps:

| Boundary              | Frames | Treatment                              |
| --------------------- | ------ | -------------------------------------- |
| Opening to reveal     | 12     | Document-to-screen shape match         |
| Reveal to recognition | 16     | Screen push-in                         |
| Recognition to answer | 10     | Passage wipe                           |
| Answer to source      | 12     | Citation expansion                     |
| Source to offline     | 0      | Hard cut                               |
| Offline to pipeline   | 18     | Device interior reveal                 |
| Pipeline to closing   | 20     | Result contraction and wordmark reveal |

These are starting values, not a requirement to prolong every cut. At these values, authored scene durations can be 162, 166, 250, 372, 180, 258, 260, and 180 frames. Their sum is 1828 frames; subtracting 88 overlapping transition frames gives the 1740-frame, 58-second master. Voiceover can shift boundaries while preserving the runtime budget.

## Scope and assets

The first visual redesign can proceed with placeholders and existing local fonts. Standard React/CSS/SVG and the installed Remotion transitions package can handle the proposed shallow depth, masks, camera crops, and vector diagram. Add a full 3D stack only if a specific shot benefits from it.

The five existing recording categories remain sufficient. Full native-resolution capture gives room for deliberate close-ups; sharp screenshots and the original document are helpful for matched transitions. Final narration, licensed music, and the Vault logo remain production assets to obtain. No further recordings are required just to review the new direction.

Implementation reference: Remotion supports authored [custom transition presentations](https://www.remotion.dev/docs/transitions/presentations/custom); [TransitionSeries](https://www.remotion.dev/docs/transitions/transitionseries) provides the overlapping timeline structure.
