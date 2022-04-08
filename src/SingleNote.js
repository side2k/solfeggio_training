import { useRef, useEffect } from "react";
import { renderAbc } from "abcjs";

function generateRandomNote() {
  const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
  const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];

  return randomNote;
}

function generateNotationWithRandomNote() {
  const note = generateRandomNote();
  return {
    note: note,
    octave: 4,
    notation: `
    T: Какая это нота?
    L: 1/4
    K: clef=treble
    ${note}`,
  };
}

const SingleNote = () => {
  const abcRef = useRef();

  useEffect(() => {
    const { note, octave, notation } = generateNotationWithRandomNote();
    console.log(abcRef.current);
    renderAbc(abcRef.current.id, notation);
  }, []);
  return (
    <div>
      <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />
    </div>
  );
};

export default SingleNote;
