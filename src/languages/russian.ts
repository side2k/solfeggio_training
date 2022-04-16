import { Note, Octave } from "../types";

export const NOTE_NAMES: { [key: string]: string } = {
  [Note.Do]: "До",
  [Note.Re]: "Ре",
  [Note.Mi]: "Ми",
  [Note.Fa]: "Фа",
  [Note.Sol]: "Соль",
  [Note.La]: "Ля",
  [Note.Si]: "Си",
};
export const OCTAVE_LABELS: { [key: number]: string } = {
  [Octave.Great]: "большой",
  [Octave.Small]: "малой",
  [Octave.Line1]: "первой",
  [Octave.Line2]: "второй",
  [Octave.Line3]: "третьей",
};

export const OCTAVE_SHORT_LABELS: { [key: number]: string } = {
  [Octave.Great]: "Б",
  [Octave.Small]: "М",
  [Octave.Line1]: "1",
  [Octave.Line2]: "2",
  [Octave.Line3]: "3",
};
