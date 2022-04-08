import { useRef, useEffect, useState, useMemo } from "react";
import { renderAbc } from "abcjs";

const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const NOTE_NAMES = ["до", "ре", "ми", "фа", "соль", "ля", "си"];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6];
const OCTAVE_LABELS = [
  "суб-контр", // 0
  "контр", // 1
  "большой", // 2
  "малой", // 3
  "первой", // 4
  "второй", // 5
  "третьей", //6
];

function generateRandomNote() {
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  const octaves = [4, 5];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];

  return { note, octave };
}

function noteToName(note, octave) {
  const noteLabelIndex = NOTES.indexOf(note);
  const octaveLabelIndex = OCTAVES.indexOf(octave);

  return `${NOTE_NAMES[noteLabelIndex]} ${OCTAVE_LABELS[octaveLabelIndex]} октавы`;
}

function noteToNotation(note, octave) {
  const startOctave = 4;
  const delta = octave - startOctave;

  if (delta === 0) {
    return note;
  } else if (delta < 0) {
    return note + ",".repeat(-delta);
  }

  return note.toLowerCase() + "'".repeat(delta - 1);
}
const Note = ({ note, octave }) => {
  const abcRef = useRef();

  const staveData = `
  T: Какая это нота?
  L: 1/4
  K: clef=treble
  ${noteToNotation(note, octave)}`;

  useEffect(() => {
    renderAbc(abcRef.current.id, staveData);
  }, [note]);

  return <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />;
};

const SingleNote = () => {
  const [alternator, setAlternator] = useState(false);
  const { note, octave } = useMemo(() => generateRandomNote(), [alternator]);

  return (
    <div>
      <Note note={note} octave={octave} />
      <div className="py-3">{noteToName(note, octave)}</div>
      <button
        className="border border-black rounded p-3 bg-gray-300"
        onClick={() => setAlternator(!alternator)}
      >
        Дальше
      </button>
    </div>
  );
};

export default SingleNote;
