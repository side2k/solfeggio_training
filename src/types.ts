export enum Note {
  Do = "C",
  Re = "D",
  Mi = "E",
  Fa = "F",
  Sol = "G",
  La = "A",
  Si = "B",
}

export enum Octave {
  DblContra = -1,
  SubContra,
  Contra,
  Great,
  Small,
  Line1,
  Line2,
  Line3,
  Line4,
  Line5,
  Line6,
}
export type NoteData = {
  note: Note;
  octave: Octave;
};
