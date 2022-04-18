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
  SubContra = 0,
  Contra,
  Great,
  Small,
  Line1,
  Line2,
  Line3,
  Line4,
  Line5,
  Line6,
  DblContra = -1,
}
export type NoteData = {
  note: Note;
  octave: Octave;
};

export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export type DisplayedNote = NoteData & { clef: Clef };
