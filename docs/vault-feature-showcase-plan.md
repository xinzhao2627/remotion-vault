# Vault feature showcase: code-informed implementation plan

Status: the feature-reel structure was implemented as a study, then superseded by the user's request for a story-led pitch with a short feature interlude. The current direction is [vault-balanced-pitch.md](./vault-balanced-pitch.md). This document retains the code inventory and recording research.

## Creative objective

Present Vault as a capable everyday document toolkit with personal, on-device intelligence. Preserve the 58-second, 1920 x 1080/30 fps master and the maximum 60-second requirement. Increase the number of visible actions, shorten establishing shots, and spend substantially more of the film on practical features.

Proposed narrative: **Capture. Shape. Organize. Read. Ask.**

The current film spends 12 seconds on one answer, six on its source, eight on offline use, and eight on the pipeline. Together those occupy 34 of 58 seconds. The next cut allocates 30 seconds to capture, organization, document viewing, and OCR editing; AI, citations, offline use, and vector architecture share 21 seconds. The opening and closing take seven seconds.

## Inspection scope

Reviewed the Android project's current `merged` checkout under `C:/Users/rainn/Documents/Projects/appbuilder`: scanner configuration, vault and folder screens, save flow, PDF/image viewers, text editor and view model, chat controls, navigation, repository, OCR helper, local storage, and manifest. These are source/UI-handler findings, not a new device test run. Scanner editing features are supported by the configured SDK mode and its official documentation; final screen recordings will establish their exact device UI.

The agreed completed-product scope still includes on-device embeddings and local vector indexing. The checked-out retrieval implementation remains keyword-based; the feature pitch continues to target the completed vector-enabled form explicitly requested by the user.

## Feature inventory and film placement

| Capability                                        | Evidence                                                              | Priority and treatment                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Camera document scanning                          | `scanner/DocumentScannerHelper.kt`, `ui/vault/VaultScreen.kt`         | Hero capture shot                                                               |
| Gallery import within scanner                     | `setGalleryImportAllowed(true)`                                       | Short capture beat                                                              |
| Separate image import                             | `PickVisualMedia` flow in `VaultScreen.kt`                            | Brief import-menu action                                                        |
| Import existing PDF                               | `OpenDocument` flow in `VaultScreen.kt`                               | Brief import-menu action                                                        |
| Crop and rotate scanned pages                     | Scanner configured with `SCANNER_MODE_FULL`; SDK editing capabilities | Close-up on page edges and orientation                                          |
| Grayscale/auto-enhancement filters                | Full scanner mode includes filter mode                                | Before/after reveal                                                             |
| Scanner cleanup and page reordering               | Full-mode SDK capabilities                                            | Optional insert if recorded clearly; preserve reading time for primary tools    |
| Multi-page scanning to PDF                        | `setPageLimit(100)`; app prefers returned PDF                         | Show adding a second page and the resulting PDF                                 |
| Create a custom folder                            | `VaultDialogs.kt`, `VaultViewModel.kt`, `SaveDocumentScreen.kt`       | Name a folder; show it appear                                                   |
| Choose folder while saving                        | Folder selector in `SaveDocumentScreen.kt`                            | Save the demonstrated document into that folder                                 |
| Name and rename documents                         | Save title field; rename dialog and repository handler                | Quick rename action                                                             |
| Folder document counts and type/text status       | `VaultScreen.kt`, `FolderDetailScreen.kt`, DAO                        | Supporting library detail rather than a dedicated scene                         |
| Read saved PDFs and navigate pages                | `PdfViewerScreen.kt`, `PdfViewerViewModel.kt`                         | Previous/Next action with page counter visible                                  |
| Image pinch zoom and pan                          | `ImageViewerScreen.kt`, clamped transform gestures                    | Macro detail shot of an image document                                          |
| On-device image/PDF OCR                           | `ocr/TextRecognitionHelper.kt`                                        | Extraction output; multi-page text briefly visible                              |
| Extract on save or later                          | `SaveDocumentScreen.kt`, `DocumentTextScreen.kt`                      | Combine save action and extraction result                                       |
| Edit OCR text and save per page                   | `PageTextCard`, `DocumentTextViewModel.kt`                            | Correct a short word/line and show saved state                                  |
| Reset unsaved text changes                        | `PageTextCard` Reset button                                           | Optional quick insert; does not imply restoring raw OCR after an edit was saved |
| Re-run OCR                                        | Text screen menu                                                      | Secondary menu detail                                                           |
| Remove extracted text while keeping original file | Text screen confirmation and repository                               | Optional control/ownership insert; use a disposable demo document               |
| Search all documents, one folder, or one document | Scope dropdown in `ChatScreen.kt`                                     | Open scope menu and select the intended scope                                   |
| Local-model answer and excerpt mode               | Model switch, answer-mode labels, generation adapter                  | Hero AI result; excerpt mode can appear as a supporting detail                  |
| Citation opens original image/PDF page            | `SourceCard`, `AppNavigation.kt`, viewers                             | Readable source proof within AI sequence                                        |
| Refresh/cancel/retry operations                   | Chat screen callbacks and view model                                  | Supporting UI only; no dedicated time                                           |
| Local processing and offline operation            | Local adapters and manifest removes Internet permissions              | Fresh offline question proof after setup                                        |
| System light/dark appearance                      | `ui/theme/Theme.kt`                                                   | Useful visual variation; do not imply a manual in-app theme setting             |
| On-device embeddings and local vector index       | Agreed completed-product scope                                        | Short signature diagram near ending                                             |

Important feature boundaries:

- Crop/filter/cleanup are scanner editing tools applied before the resulting PDF is saved. The saved-PDF viewer in this checkout has page navigation and a text action, with no filter editor found. Phrase the feature as **“Crop and enhance your scans.”**
- Image zoom/pan is implemented. Do not transfer that claim to the PDF viewer.
- The scanner can return JPEG/PDF, and Vault prefers the PDF. This does not establish a general user-facing PDF export/share feature.
- No UI for folder renaming, moving existing documents between folders, custom sort controls, or an arbitrary-PDF annotation/editor was found in the reviewed feature screens. Do not imply those actions through stand-ins.
- Supporting controls can communicate breadth through actual footage without allocating a separate hero scene to every button.

Scanner reference: [ML Kit document scanner capabilities](https://developers.google.com/ml-kit/vision/doc-scanner). The configured Full mode includes crop, rotate, reordering, filters, and cleanup. Exact available controls should be recorded on the prepared demo device.

## Proposed 58-second edit

| Time    | Beat                     | Feature actions                                                                  | Composition and transition                                                                                                                                                                              |
| ------- | ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0-3 s   | Immediate product hook   | Three short glimpses: scan boundary, organized folder, answer                    | Vault identity appears early with “Capture. Organize. Understand.” A selected scan expands into the next shot.                                                                                          |
| 3-12 s  | Capture and shape        | Camera scan, crop, rotate, filter before/after, add page, image/PDF import cue   | One three-phone choreography: camera, crop, enhanced result. Attention passes from one active phone to the next; the other views pause and sit back. Push into the active tool for a readable close-up. |
| 12-20 s | Make it yours            | Create folder, select destination, name/save, rename                             | One phone moves laterally through the workflow. Folder names and document titles become editorial anchors. The created folder leads into its actual contents; do not invent drag/drop or move features. |
| 20-26 s | Read and inspect         | PDF page navigation; image zoom/pan                                              | A large page becomes the canvas. Cut on a page change, then move to an image detail shot. Keep zoom specific to image viewing.                                                                          |
| 26-33 s | Extract and refine       | On-device OCR, edit text, Save Page; short re-run/reset menu cue if time permits | Two floating panels pair the page with editable text. A correction and saved state provide the main action. The selected text leads into the chat prompt.                                               |
| 33-44 s | Ask with focus           | Show scope menu, ask within chosen folder/document, local answer, open source    | One large readable interface. Scope menu: ~2 s; question/answer: ~6 s; citation/source: ~3 s. The source reference enlarges into its original page.                                                     |
| 44-49 s | Offline proof            | Connectivity disabled, fresh question, completed result                          | Hard cut to dark, centered phone and a brief musical dip. Preserve the full raw recording; condense processing transparently in the film.                                                               |
| 49-54 s | Intelligence stays local | Text to embeddings to vector retrieval to local AI                               | Faster, three-stage conceptual pipeline. Locality and no monthly AI API fees land as short coordinated benefit statements. The output resolves into the identity.                                       |
| 54-58 s | Closing identity         | Vault and product promise                                                        | Clean wordmark hold with “Your documents. Your intelligence. Your device.” No external CTA for the hackathon.                                                                                           |

These are net film windows. Transition overlap must be included within the 1740-frame runtime rather than added on top. The opening hook is reduced from ten seconds of establishing material to three seconds. Product identity is visible early.

## Choreography and pacing rules

- Build approximately 16-20 meaningful visual beats across the film, arranged into clear feature families. A beat can demonstrate related capabilities together.
- Give ordinary actions roughly 1-2 seconds, simple setup glimpses less, and important answer/source text 2.5-4 seconds. Keep a longer reading hold only when there is useful information to absorb.
- The three-phone capture shot is the principal ensemble moment. Active phone: nearly front-facing and largest; supporting phones: slight opposing angles and reduced emphasis. Transfer attention sequentially, not three simultaneous gestures.
- Use a two-panel document/text comparison later. Return to a single enlarged screen for AI and source evidence. This provides varied composition without repeating a phone fan in every chapter.
- Multiple phone representations show different capabilities of the app; they do not represent device synchronization.
- Use portrait phone frames for context, then enlarge the control or result the viewer needs to see. At 1080p, tiny screens cannot carry three detailed interfaces equally.
- Cut when an action resolves: crop handles settle, filter changes, folder appears, title saves, page changes, edited text saves, citation opens. Those events create natural energy.
- Preserve a shared motif: the selected page, folder, recognized passage, and source. Reuse its highlight or boundary with a new meaning at the next step.
- Introduce contrast at the offline proof. Let the ending breathe for four seconds so greater feature density does not erase the brand.
- Avoid simply running the current composition faster. Reallocate time and add visible actions.

## Narration and soundtrack

Target approximately 100-115 words, delivered with clear phrasing and room for action-driven music accents. Draft:

> Meet Vault. Capture. Organize. Understand.
>
> Scan, crop, rotate, and enhance. Import photos and PDFs. Combine multiple pages.
>
> Create your own folders. Name and rename your documents. Keep everything organized.
>
> Read PDFs page by page. Zoom into images.
>
> Extract text on your device. Correct it. Save your changes.
>
> Ask a document, a folder, or your whole library. Get local AI answers with sources you can open.
>
> Even offline. No cloud inference. No monthly AI API fees.
>
> On-device embeddings. Local vectors. Your personal RAG pipeline.
>
> Vault. Your documents. Your intelligence. Your device.

Time the actual narration before locking cuts; revise words to fit each shot window. Most feature labels belong in short on-screen cues rather than extra sentences. Use an instrumental score with a clearer pulse and an earlier build. Land a few accents on the crop/filter/save events; reduce it at the offline cut; resolve naturally during the final identity. The score supports the voice and the edit rather than forcing every action onto the same rhythm.

## Recordings needed for the expanded showcase

Carry the ownership/cost narration across the offline-to-pipeline boundary so the five-second diagram does not need to accommodate every technical and economic phrase.

Retain the existing raw-file specification: direct Android display capture at native portrait size, preferably at least 1080 pixels wide, original MP4/H.264 at 30 or 60 fps, stable theme/device/build, and three-second handles. These are workflow takes; the final film extracts short moments from them.

| Take          | Capture                                                                                            | Approximate raw length |
| ------------- | -------------------------------------------------------------------------------------------------- | ---------------------- |
| Capture tools | Scan a page; adjust crop; rotate; show a clear filter before/after; add a second page; save PDF    | 45-90 s                |
| Imports       | Show image and PDF import entry points and one completed import                                    | 25-45 s                |
| Organization  | Create folder; save a named document into it; open folder; rename a document                       | 30-60 s                |
| Reading       | Navigate a multi-page PDF; separately pinch-zoom and pan an image                                  | 20-40 s                |
| Text control  | Extract text; correct a short line; Save Page; show OCR menu; optionally discard an unsaved change | 30-60 s                |
| Scoped AI     | Open scope choices; select one; ask; retain full response; open its original source                | Full operation         |
| Offline proof | Continuous connectivity-off, fresh question, response, source take                                 | Full operation         |

Each take can supply several authored shots. Use one coherent document corpus and recognizable titles throughout. New capture/organization/reading/text takes add the breadth missing from the original five-shot brief. Original documents and crisp screenshots of tool states help construct the initial stand-ins and seamless transitions. Optional cleanup and extracted-text removal can be recorded only if they fit naturally; they are secondary inserts, not requirements to finish the pitch.

## Remotion implementation sequence

1. **Feature matrix and shot selection.** Assign each priority feature to one visible action. Give optional controls a clear fallback if the chosen recording is not legible. Map supplied clips and source timecodes before editing.
2. **Timeline restructuring.** Replace the long standalone recognition/answer/source passages with `CaptureTools`, `Organize`, `ReadInspect`, `TextControl`, and `ScopedAnswer` scenes. Shorten offline, pipeline, and closing to their new windows. Keep `VaultPitch` as the 1740-frame master and register substantial scenes for standalone preview.
3. **Media controls.** Add separate authored slots for scan, crop, rotate, filter, imports, folder creation, save destination, rename, PDF navigation, image zoom, text extraction/edit/save, scope selection, answer, and source. A workflow recording may be reused with distinct in-points. Retain normalized camera controls and add optional end-frame holds for short inserts after footage intake.
4. **Choreography system.** Extend `Phone` to support editable pose, depth, active emphasis, and matched start/end positions. Implement the ensemble as independently authored phone instances. Avoid generating all editable feature clips from one loop. Use a reusable two-panel comparison for text control and a page-focused treatment for reading.
5. **Transitions.** Adapt the existing object reveals to the new actions: scan edge to crop; filter before/after split; folder name to folder contents; PDF page change to image detail; saved text to scope selector; citation to source. Reserve the hard cut for offline and the resolving iris for closing.
6. **Placeholder pass.** Build faithful tool-state illustrations from source/UI and screenshots. Keep them identified as placeholders until replaced. Review a keyframe contact sheet and the full-speed silent preview for feature recognition.
7. **Audio/footage pass.** Place the timed narration, align action cuts, then fit music phrasing and sparse sound accents. Real clip actions may shift internal beats while preserving the total runtime.
8. **Verification.** Check that the intended feature is recognizable after each short insert, active screens remain legible, no major action is hidden behind a transition, and repeated compositions are limited. Verify clip/source timing and camera crops, run code checks, and confirm runtime with all overlaps and the audio tail included. Preview in Studio; export only when requested.

## Success criteria

Within the first 20 seconds, a viewer has seen capture/editing and organization capabilities. By 33 seconds, they have seen viewing and text control. AI still receives one readable answer-and-source demonstration. Offline/local processing remains a distinctive closing argument. Viewers should remember Vault as both a useful document toolkit and personal local AI.

The main risks to resolve during production are legibility in multi-phone shots, actual SDK tool states on the recording device, and compression of local model processing time. These are review tasks tied to the proposed shots rather than reasons to delay the placeholder version.
