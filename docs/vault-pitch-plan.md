# Vault hackathon pitch: implementation and recording plan

## Brief

- Product: Vault, an Android app built with Kotlin.
- Audience: hackathon panelists, founders, investors, professionals, students, and consumers.
- Format: 1920 x 1080, 16:9, 30 fps, 58 seconds maximum target; hard limit 60 seconds including the closing hold and audio tail.
- Treatment: polished product film with calm, confident voiceover, synchronized instrumental music, real app demonstrations, and precise motion graphics.
- Product scope: the completed product includes on-device OCR, local AI inference, on-device embeddings, local vector indexing, and a personal RAG pipeline. The user explicitly requested that vectors be presented as shipped features of that completed form.
- Close: Vault identity and the product promise; no signup, fundraising, website, or contact CTA is required for this hackathon.

Central promise: **Your documents. Answers on your device.**

Use one relatable document workflow as the spine of the film. A laptop warranty is a proposed example because it is accessible across the audience. The final question and answer must match the supplied document and the actual recorded response. Brief library shots can show notes, agreements, and receipts to suggest breadth without adding separate demonstrations.

## Inspection findings and target-build assumption

The inspected app source supports bundled text recognition, local model inference, document/folder scopes, and source-page navigation. Its manifest explicitly removes Internet permissions. The checked-out retrieval implementation currently uses SQLite FTS4 keyword retrieval. This production plan intentionally targets the vector-enabled completed form requested by the user, rather than claiming the inspected code has already changed.

Use the intended completed architecture for graphics. Identify the app build used for new captures and confirm with the developers that embeddings and the vector store operate locally. No code changes to the Android app are part of this planning task.

The scanner has initial Google Play services setup and the local model must be provisioned. Film the offline demonstration after that setup. Describe local document processing and inference; do not imply that every installation/setup dependency is absent.

The five MP4 files under the Android project's `video_assets` folder are all 1920 x 1080 at 30 fps and total 60 seconds. Sampled middle frames show unrelated desktop dashboards, emulator/home screens, and YouTube rather than a usable Vault workflow. Fresh, direct app captures are the basis for this plan.

## Editorial timeline

| Time    | Scene                           | Picture and action                                                                                                                  | Message                                                  |
| ------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 0-5 s   | Hook                            | A question appears beside an isolated phone; a clean document page resolves behind it                                               | Your documents hold answers                              |
| 5-10 s  | Product reveal                  | Vault wordmark and a real, populated document library                                                                               | Meet Vault; personal document intelligence on your phone |
| 10-18 s | Capture and recognize           | Scan/import a page; cut into its extracted text; emphasize a relevant sentence                                                      | On-device text recognition                               |
| 18-30 s | Ask and answer                  | Enter one short question; show the local AI answer and its source reference                                                         | Turn stored documents into useful answers                |
| 30-36 s | Open the source                 | Tap the reference and open the original cited page; hold long enough to connect it to the answer                                    | Answers connected to their sources                       |
| 36-44 s | Offline proof                   | Show airplane mode on, Wi-Fi/mobile data off; return to Vault and complete a fresh question                                         | Useful AI, even offline                                  |
| 44-52 s | How it works and why it matters | A single diagram stays inside the phone: text to embeddings to local vector index to AI answer; simple benefit copy lands beside it | Personal RAG; no cloud inference; no monthly AI API fees |
| 52-58 s | Closing identity                | Phone settles, Vault wordmark and closing line hold; music resolves before the final frame                                          | Your documents. Your intelligence. Your device.          |

The table specifies net edit time. Any overlapping transitions must be subtracted when calculating composition duration. If the demo needs more reading time, shorten the reveal or architecture passage; keep the close and the 60-second limit intact.

## Draft voiceover

> Your documents hold answers.
>
> Meet Vault. Personal document intelligence, right on your phone.
>
> Scan a page. Turn it into searchable text.
>
> Ask a question. Vault finds relevant information and uses local AI to answer, with sources you can open.
>
> Even offline.
>
> Text recognition. Vector embeddings. Retrieval. AI. All on your device.
>
> No cloud inference. No monthly AI API fees.
>
> From study notes to work documents, your information stays with you.
>
> Vault. Your documents. Your intelligence. Your device.

This is a draft, to be timed with the selected voice and actual demo. Use a warm, assured delivery with short pauses around the reveal, offline proof, and final identity. Target roughly 90-105 words, leaving space for the interface to speak. Avoid an exaggerated trailer voice. Lock the narration take before fine-timing the edit.

## Visual and sound direction

Use near-white and graphite for the presentation canvas, with one accent derived from Vault's approved brand or UI. Keep native app colors faithful. Inter is already available locally; a supplied licensed brand font can replace it.

Use large, short headlines; a generous safe area; and a phone frame that is quiet enough to let the UI dominate. Start with the complete phone, then make controlled close-ups of the recognized sentence, answer, and source. Keep the UI front-facing during reading. Hold still when the viewer needs to understand an action.

Use a document becoming searchable knowledge as the main visual motif. The architecture animation should remain inside the device boundary to make locality understandable. Avoid a long feature list, tiny technical captions, or decorative effects that compete with the demonstration.

Choose an instrumental electronic score with an understated opening, a gentle build through the demonstration, and a resolved final chord. No lyrics. Set narration first; edit music phrasing and motion accents to the actual voiceover beats. Place quiet tactile sounds on scan completion, answer appearance, and source opening. Keep sound effects sparse.

Mix narration clearly above the score. Reduce music under speech and let it rise in pauses. As starting delivery targets, aim near -16 LUFS integrated with true peak below -1 dBTP, then check on headphones and an ordinary laptop speaker. Tune for the hackathon room if its playback requirements are supplied.

## Required recordings

Record the same device, app build, theme, orientation, font size, and demo dataset throughout. Use fictional but believable documents with legible text. Install/provision the completed demo and model before the recording session.

| File                     | What to record                                                                                                                              | Raw length                              | What it supplies                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------- |
| `01_vault_library.mp4`   | Open Vault to a tidy library containing a few named documents; one gentle scroll; settle                                                    | 10-15 s                                 | Reveal and closing hero                      |
| `02_scan_ocr.mp4`        | Capture or import the chosen page; save; show text extraction and the relevant sentence                                                     | 20-45 s                                 | Scan and on-device recognition               |
| `03_question_answer.mp4` | Show local-model mode enabled; type the agreed question; submit; retain all processing and the completed answer                             | Full operation, including any long wait | Real AI result and truthful editing choices  |
| `04_open_source.mp4`     | From that answer, tap its reference; open the original page; pause on the relevant passage                                                  | 10-20 s                                 | Grounding and source navigation              |
| `05_offline_proof.mp4`   | One continuous take: show airplane mode on and Wi-Fi/data off, return to Vault, submit a fresh question, obtain the answer, open its source | Full operation, ideally under 3 min     | Continuity evidence for the offline sequence |

The final cut uses only short excerpts; raw takes should be longer. Leave about three seconds still before and after each action. Take two clean versions where practical. Preserve the complete offline take even if the final film uses several excerpts from it. A complete offline take can also supply answer/source shots, reducing the recording burden.

Capture specification:

- Direct screen recording of the Android display, in native portrait orientation. Aim for at least 1080 pixels across if the device supports it; retain its actual aspect ratio, such as 1080 x 1920 or 1080 x 2400. The final presentation canvas is landscape 1080p.
- Original MP4 with H.264 preferred, stable 30 fps or 60 fps if available, and approximately 15-20 Mbps for readable UI. Keep original variable-rate files if that is what the recorder produces; normalize during ingest when necessary.
- Record the app display itself, with full edges, rather than filming the desktop, IDE, or an emulator embedded in a larger desktop recording.
- Provide files before trimming, zooming, adding phone frames, captions, music, or transitions. Share originals without chat-app recompression.
- Use a consistent clean theme, disable notifications, and keep text at its normal readable size. Show tap indicators only if they are subtle; pointer effects can be added in the edit.
- Microphone audio is unnecessary for screen captures. Narration is recorded separately. Android's ADB screen recorder does not record audio, which is suitable for these takes.

If using ADB, an optional capture example is:

```powershell
adb shell screenrecord --bit-rate 20000000 --time-limit 180 /sdcard/vault-demo.mp4
# Stop earlier with Ctrl+C once the operation is complete.
adb pull /sdcard/vault-demo.mp4
```

Use the phone's built-in recorder if it better supports a long inference take. Android ADB recording supports native orientation and has a three-minute recording limit: [official Android recording documentation](https://developer.android.com/tools/adb#screenrecord).

Also provide a transparent Vault logo/icon (SVG preferred, or a sharp PNG), the original demo document(s), and full-resolution PNG screenshots of the library, OCR text, answer, and cited page. Include a note with device model, build/version, local model, whether the embedding pipeline is present, and any recording limitations. If there is no final logo, use a temporary clean Vault wordmark in the preview.

Optional: a 5-10 second 1080p landscape shot of a hand holding the phone while scanning a paper document, with steady framing and soft light. This can add a physical opening or closing shot; it is not necessary to complete the film.

For supplied narration, send a clean WAV, preferably 48 kHz/24-bit mono, plus a second take. For generated narration, select the voice using a short script excerpt before producing the final take. Use licensed music and retain its provenance with other assets.

## Remotion implementation sequence

1. Finalize the question/document pair, script, brand assets, and completed-build feature description. The assumptions above provide a concrete starting point.
2. Ingest recordings into this workspace under `public/assets/vault/`. Inspect dimensions, frame rates, actual durations, answer mode, and source continuity. Identify usable in/out points and normalize only when necessary. Update the asset manifest.
3. Add a `VaultPitch` composition: 1920 x 1080, 30 fps, 1740 frames (58 seconds). Make separate scene components for the hook, reveal, recognition, answer, source, offline proof, architecture, and closing, and register substantial scenes for independent Studio preview.
4. Build editable copy, framing, and source-media controls. Keep independent clips and scenes as authored JSX nodes. Use `@remotion/media`, local fonts, and deterministic frame-based motion. Keep the total duration within the limit after transition overlaps.
5. Produce narration, place it on the master timeline, and align interface actions and on-screen messages with the relevant words. Edit a suitable licensed score around the narration; add sparse synchronized sound effects. Add restrained subtitles and prepare an SRT sidecar if needed for venue accessibility.
6. Preview in Studio. Review the film at actual playback size, on a laptop, and without audio. Check keyframes, first/last frames, cut boundaries, UI readability, source/answer consistency, and sound. Compress long processing time transparently; if accelerated, label that segment rather than imply a measured instant response.
7. Run the project checks. When export is requested, render a high-quality H.264 MP4 at 1920 x 1080/30 fps with AAC audio, inspect the encoded runtime, and check the final sound tail. Deliver the MP4, poster PNG, caption sidecar if applicable, and editable source project.

## Acceptance criteria

- Runtime never exceeds 60 seconds, including the final hold and audio tail.
- Vault identity and value are clear within the first ten seconds.
- Real OCR, local-model answer, and cited-source actions are legible.
- Local embeddings and vector indexing are presented as part of the intended completed product, with graphics matched to that architecture.
- The offline proof shows a fresh operation after connectivity is disabled.
- No invented traction, performance benchmarks, encryption claims, or free/subscription pricing promises. “No monthly AI API fees” refers to the local inference architecture, not to a claim that the app itself must be free.
- Narration is intelligible, the music resolves naturally, and the closing remains memorable without a CTA.

References for implementation: [Remotion media](https://www.remotion.dev/docs/media/video) and [render options](https://www.remotion.dev/docs/cli/render).
