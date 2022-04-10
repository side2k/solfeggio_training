export const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
export const NOTE_NAMES = ["До", "Ре", "Ми", "Фа", "Соль", "Ля", "Си"];
export const OCTAVES = [0, 1, 2, 3, 4, 5, 6];
export const OCTAVE_LABELS = [
  "суб-контр", // 0
  "контр", // 1
  "большой", // 2
  "малой", // 3
  "первой", // 4
  "второй", // 5
  "третьей", //6
];

export function noteToName(note, octave) {
  const noteLabelIndex = NOTES.indexOf(note);
  const octaveLabelIndex = OCTAVES.indexOf(octave);

  return `${NOTE_NAMES[noteLabelIndex]} ${OCTAVE_LABELS[octaveLabelIndex]} октавы`;
}
