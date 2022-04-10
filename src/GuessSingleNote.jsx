import { useState, useMemo } from "react";
import SingleNote from "./SingleNote";
import SelectNote from "./SelectNote";

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

  const onSelectNote = ({ selectedNote, selectedOctave }) => {
    if (selectedNote === note && selectedOctave === octave) {
      alert("Угадал!");
    } else {
      alert("Не угадал!");
    }
    setAlternator(!alternator);
  };

  return (
    <div>
      <SingleNote note={note} octave={octave} />
      <div className="py-3">{noteToName(note, octave)}</div>
      <SelectNote onSelectNote={onSelectNote} />
    </div>
  );
};

export default GuessSingleNote;
