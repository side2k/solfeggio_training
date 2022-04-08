import { useRef, useEffect, useState, useMemo } from "react";
import { renderAbc } from "abcjs";

function generateRandomNote() {
  const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
  const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];

  return randomNote;
}

const Note = ({ note }) => {
  const abcRef = useRef();
  const staveData = `
  T: Какая это нота?
  L: 1/4
  K: clef=treble
  ${note}`;

  useEffect(() => {
    renderAbc(abcRef.current.id, staveData);
  }, [note]);

  return <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />;
};

const SingleNote = () => {
  const [alternator, setAlternator] = useState(false);
  const note = useMemo(() => generateRandomNote(), [alternator]);

  return (
    <div>
      <Note note={note} />
      <button onClick={() => setAlternator(!alternator)}>Дальше</button>
    </div>
  );
};

export default SingleNote;
