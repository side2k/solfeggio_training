import { useRef, useEffect } from "react";
import { renderAbc } from "abcjs";

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

const SingleNote = ({ note, octave }) => {
  const abcRef = useRef();

  const staveData = `
  L: 1/4
  K: clef=treble
  ${noteToNotation(note, octave)}`;

  useEffect(() => {
    renderAbc(abcRef.current.id, staveData, { staffwidth: 400, scale: 3.3 });
  }, [note, octave]);

  return <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />;
};

export default SingleNote;
