# BEAT BLOOM — audio charting and long-note update (2026-11-15)

## Scope

This update changes only:
1. Per-song music-derived chart data and the note role/style used to play it.
2. Long-note motion, hold completion tolerance, and long-note judgement text.

Multiplayer, character skills, player names, score/result screens, and hit-sound settings are left unchanged.

## Music charting

- The existing curated event timestamps for the first three songs are preserved.
- The other six songs now have their own fixed event maps; they no longer reuse the third song's chart.
- New event maps were generated offline from each supplied MP3 using harmonic/percussive separation and spectral-flux features.
- Low-band attacks are treated as bass/buk-like accents. Strong accents can create outer-lane chords; sustained candidates become long notes.
- Percussive transients are short alternating inner-lane taps, representing snare/janggu-like attacks.
- Harmonic onsets are arranged as short ascending/descending four-lane runs. Sustained harmonic events become long notes.
- Attacks are kept at their detected audio times. BPM supplies only a light 16th-note reference: an attack is snapped only when it is already within 30 ms of that grid, preserving genuine offbeats and syncopation.
- Each event includes a role (`bass`, `percussion`, `melody`, or `chord`) for consistent in-game note styling.

### Analysis limitation

The game tracks are mixed stereo/mono music masters, not isolated stems. This analysis can distinguish low-frequency, percussive, and harmonic activity, but it cannot reliably identify every sound as a specific instrument or transcribe/align exact lyric syllables. The `melody` role therefore includes voice-like and instrument-like harmonic phrases; it is not word-level vocal transcription. Exact lyric alignment would require vocal stems or a lyric/transcription source.

## Long-note improvements

- The hold tail now moves continuously toward the judgement line according to the actual audio clock, instead of remaining a fixed-length bar with only a fill overlay.
- The tail has a moving cap and a role-aware gradient so the remaining hold duration is easier to read.
- A small release grace window absorbs touch/key-up frame jitter, especially on mobile browsers.
- A lane already occupied by an active hold cannot accidentally start a second note on that same lane.
- Long-note final judgement text is the same as tap-note text: `PERFECT!`, `GREAT!`, or `MISS!`. The `HOLD` prefix and start-of-hold judgement popup have been removed.

## Verification

- All nine chart tables are embedded and match the nine selectable songs.
- Event times are sorted and within each song duration.
- Masks use only the four available lanes.
- Long notes do not overlap a later note on the same lane in the six generated charts.
- Both inline JavaScript blocks pass `node --check`.

This is an offline chart pass, not a substitute for human rhythm-game playtesting. Listen and play through each stage to adjust any notes that feel musically inaccurate or too difficult.
