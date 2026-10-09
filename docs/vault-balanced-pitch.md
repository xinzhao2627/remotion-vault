# Vault: story first, with a short feature interlude

Status: implemented. This is the current creative direction, replacing the feature-reel structure.

The user preferred the earlier document-to-answer narrative and requested moderate pacing. Extra capabilities now appear after the main answer/source proof, in two three-second sections. Each has four simultaneously displayed phone views: one workflow context and three highlighted capabilities. This limits additional feature messages to six.

## Current timeline

| Film time | Beat                                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| 0-4 s     | Document premise and question                                                          |
| 4-8 s     | Vault product reveal                                                                   |
| 8-14 s    | On-device text recognition                                                             |
| 14-23 s   | Question and local AI answer                                                           |
| 23-28 s   | Open the original source                                                               |
| 28-30 s   | “There's more to Vault” lead-in                                                        |
| 30-33 s   | Crop, enhance, and arrange scanned pages; fourth phone provides document context       |
| 33-36 s   | Create folders, rename documents, and edit text; fourth phone provides library context |
| 36-43 s   | Offline proof and ownership                                                            |
| 43-51 s   | On-device embeddings, local vector retrieval, and local AI                             |
| 51-55 s   | Vault closing identity                                                                 |

The master is 1650 frames at 30 fps, 1920 x 1080. Eighty overlapping transition frames are accounted for; they do not extend the 55-second duration. The feature groups use a consistent device arrangement and quiet motion so the six tool messages remain secondary to the pitch.

## Implementation

- The original Hook, Reveal, Recognition, Answer, and Source treatments are restored to the master with shortened, readable windows.
- The opening contains no rapid feature montage.
- `MoreToVault` provides the transition into the extra capabilities.
- `RefineExtras` and `OrganizeExtras` each have four separately authored phone/media nodes and their own standalone compositions.
- Page ordering is depicted within the scanner editing flow, before the resulting PDF is saved. This does not add an arbitrary saved-PDF editing claim.
- The offline text's user-authored positioning is preserved.
- Main story recordings and feature inserts support source trims, camera framing, and optional frame holds.
- The previous dense feature reel remains available as individual studies in Studio; it is not the master narrative.

Recordings are still replaced through the Props editor. Main story footage can use the existing library/OCR/answer/source/offline fields or matching feature objects. Feature-group footage maps to `features.pages`, `features.crop`, `features.filter`, `features.reorderPages`, `features.library`, `features.createFolder`, `features.rename`, and `features.editText`.

## Asset state and review

The illustrative warranty, OCR, and AI result are demo content. The feature screens remain labeled as placeholders until real recordings arrive. The vector scene follows the agreed completed-product assumption. No final narration or music has been generated; updated narration cues and an offline music dip are prepared for asset integration.

Checked: lint and TypeScript pass; the CLI loads the master at 55 seconds and all scene compositions; 45 selected frames cover story beats, transitions, both extra groups, and the ending. Replacement footage was checked across the restored story and both feature groups. Identical pixels at two later answer frames verify the optional footage hold. Studio serves the preview. No full pitch video has been exported.
