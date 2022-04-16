import { Note, Octave, NoteData } from "./types";
import {
  NOTE_NAMES,
  OCTAVE_LABELS,
  OCTAVE_SHORT_LABELS,
} from "./languages/russian";

export function noteToName(note: Note, octave: Octave): string {
  return `${NOTE_NAMES[note]} ${OCTAVE_LABELS[octave]} октавы`;
}

export function noteToShortName({ note, octave }: NoteData): string {
  return `${NOTE_NAMES[note]}-${OCTAVE_SHORT_LABELS[octave]}`;
}

export function generateRandomNote(): NoteData {
  const notes = Object.values(Note);

  const note = notes[Math.floor(Math.random() * notes.length)];

  const availableOctaves: Octave[] = [Octave.Line1, Octave.Line2];
  const octave =
    availableOctaves[Math.floor(Math.random() * availableOctaves.length)];
  return { note, octave };
}
