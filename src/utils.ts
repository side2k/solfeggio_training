import { Note, Octave, NoteData, Clef, NoteRange } from "./types";
import {
  NOTE_NAMES,
  OCTAVE_LABELS,
  OCTAVE_SHORT_LABELS,
} from "./languages/russian";

const OCTAVES = Object.values(Octave)
  .map((n) => +n)
  .filter((n) => !Number.isNaN(n)) as Octave[];
const NOTES = Object.values(Note) as Note[];

const DISPLAYED_RANGES = {
  [Clef.Treble]: {
    min: { note: Note.Fa, octave: Octave.Small },
    max: { note: Note.Mi, octave: Octave.Line3 },
  },
  [Clef.Bass]: {
    min: { note: Note.Do, octave: Octave.Great },
    max: { note: Note.Sol, octave: Octave.Line1 },
  },
};

export function noteToName(note: Note, octave: Octave): string {
  return `${NOTE_NAMES[note]} ${OCTAVE_LABELS[octave]} октавы`;
}

export function noteToShortName({ note, octave }: NoteData): string {
  return `${NOTE_NAMES[note]}-${OCTAVE_SHORT_LABELS[octave]}`;
}

function noteToAbsoluteIndex(note: NoteData): number {
  const indexWithinOctave = NOTES.indexOf(note.note);
  const octaveIndex = note.octave.valueOf();
  if (isNaN(octaveIndex)) {
    throw new Error("fuck it!");
  }

  return octaveIndex * 7 + indexWithinOctave;
}

function absoluteIndexToNote(index: number): NoteData {
  const octaveIndex = Math.floor(index / 7);
  const octave = OCTAVES[octaveIndex];
  const note = NOTES[index - octaveIndex * 7];

  return { note, octave };
}

export function noteRangeToIndexRange(range: NoteRange): number[] {
  const startIndex = noteToAbsoluteIndex(range.min);
  const endIndex = noteToAbsoluteIndex(range.max);

  if (startIndex > endIndex) {
    throw new Error(
      `min note(${JSON.stringify(range.min)}) can't be higher than
      max(${JSON.stringify(range.max)})`
    );
  }

  return Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => startIndex + index
  );
}

export function generateRandomNote(range: NoteRange): NoteData {
  const availableIndexes = noteRangeToIndexRange(range);

  const randomIndex =
    availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

  return absoluteIndexToNote(randomIndex);
}

export function getRandomClef(note: NoteData): Clef {
  const noteIndex: number = noteToAbsoluteIndex(note);
  const availableClefs = Object.entries(DISPLAYED_RANGES)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([clef, range]) => {
      const indexRange = noteRangeToIndexRange(range);
      return indexRange.indexOf(noteIndex) >= 0;
    })
    .map(([clef]) => clef);

  return availableClefs[
    Math.floor(Math.random() * availableClefs.length)
  ] as Clef;
}
