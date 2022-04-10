import { useState, useMemo } from "react";
import SingleNote from "./SingleNote";

import { NOTES, noteToName } from "./notes";

function generateRandomNote() {
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  const octaves = [4, 5];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];

  return { note, octave };
}

const GuessSingleNote = () => {
  const [alternator, setAlternator] = useState(false);
  const { note, octave } = useMemo(() => generateRandomNote(), [alternator]);

  return (
    <div>
      <SingleNote note={note} octave={octave} />
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

export default GuessSingleNote;
