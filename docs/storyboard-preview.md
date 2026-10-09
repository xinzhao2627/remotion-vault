# Vault preview status

The current `VaultPitch` is a story-led 55-second preview at 1920 x 1080/30 fps. It restores the original document, product, OCR, answer, and source sequence at a moderate pace. Extra tools appear only in a short interlude after the source proof, followed by offline use and the local vector/RAG payoff.

The interlude has a two-second lead-in and two three-second groups. Each group shows four phone views, with one contextual screen and three highlighted capabilities. Six extra features are featured: crop, enhancement, page ordering, folder creation, renaming, and text editing.

See [the current timing and direction](./vault-balanced-pitch.md). The feature-reel studies remain available independently in Studio. The offline text positioning saved by the user is preserved.

Preview: http://localhost:3000/VaultPitch

Recording illustrations and the sample two-year warranty are demo content. The vector diagram represents the completed feature set requested by the user and is labeled conceptual. Real footage, final narration, and music remain pending. Review annotations are off by default; turn `showReviewNotes` on to see narration cues.

Replacement and hold controls are documented in [the recording guide](../public/assets/vault/README.md).

Verification: lint and TypeScript pass; the master loads at 1650 frames (55 seconds); all scene compositions load. Forty-five selected frames cover the story, transitions, feature groups, offline cut, and ending. Recording replacements were exercised across the story and both groups. An answer recording held identical pixels at two later frames, verifying the optional frame hold. Studio responds at the preview URL. No full pitch video has been exported.
