import { useState, useMemo, useRef } from "react";
import SingleNote from "./SingleNote";
import SelectNote from "./SelectNote";

import { NOTES } from "./notes";

function generateRandomNote() {
  const note = NOTES[Math.floor(Math.random() * NOTES.length)];
  const octaves = [4, 5];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];

  return { note, octave };
}

const GuessSingleNote = () => {
  const [alternator, setAlternator] = useState(false);
  const { note, octave } = useMemo(() => generateRandomNote(), [alternator]);
  const noteSelector = useRef();
  const indicatorTimeout = 1500;

  const onSelectNote = ({ selectedNote, selectedOctave }) => {
    if (selectedNote === note && selectedOctave === octave) {
      noteSelector.current.indicateRight(indicatorTimeout);
    } else {
      noteSelector.current.indicateWrong(indicatorTimeout);
    }
    setTimeout(() => {
      setAlternator(!alternator);
    }, indicatorTimeout);
  };

  return (
    <div>
      <SingleNote note={note} octave={octave} />
      <SelectNote onSelectNote={onSelectNote} ref={noteSelector} />
    </div>
  );
};

export default GuessSingleNote;
