import { useState, useMemo, useRef } from "react";
import SingleNote from "./SingleNote";
import SelectNote from "./SelectNote";
import Results from "./Results";

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
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);

  const onSelectNote = ({ selectedNote, selectedOctave }) => {
    if (selectedNote === note && selectedOctave === octave) {
      noteSelector.current.indicateRight(indicatorTimeout);
      setRightAnswersCount(rightAnswersCount + 1);
    } else {
      noteSelector.current.indicateWrong(indicatorTimeout);
      setWrongAnswersCount(wrongAnswersCount + 1);
    }
    setTimeout(() => {
      setAlternator(!alternator);
    }, indicatorTimeout);
  };

  return (
    <div>
      <div className="flex flex-row">
        <SingleNote note={note} octave={octave} />
        <Results right={rightAnswersCount} wrong={wrongAnswersCount} />
      </div>
      <SelectNote onSelectNote={onSelectNote} ref={noteSelector} />
    </div>
  );
};

export default GuessSingleNote;
