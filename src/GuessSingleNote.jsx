import { useState, useRef } from "react";
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
  const [note, setNote] = useState();
  const [octave, setOctave] = useState();
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [disableSelector, setDisableSelector] = useState(false);
  const noteSelector = useRef();

  const indicatorTimeout = 500;
  const beepRight = new Audio("./beep_right.mp3");
  const beepWrong = new Audio("./beep_wrong.mp3");

  const updateNote = () => {
    let randomNote;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      randomNote = generateRandomNote();
      if (randomNote.note != note) {
        break;
      }
    }
    setNote(randomNote.note);
    setOctave(randomNote.octave);
  };

  if (!note || !octave) {
    updateNote();
  }

  const onSelectNote = ({ selectedNote, selectedOctave }) => {
    if (selectedNote === note && selectedOctave === octave) {
      noteSelector.current.indicateRight(indicatorTimeout);
      beepRight.play();
      setRightAnswersCount(rightAnswersCount + 1);
      setDisableSelector(true);
      setTimeout(() => {
        updateNote();
        setDisableSelector(false);
      }, indicatorTimeout);
    } else {
      noteSelector.current.indicateWrong(indicatorTimeout);
      beepWrong.play();
      setWrongAnswersCount(wrongAnswersCount + 1);
    }
  };

  return (
    <div>
      <Results right={rightAnswersCount} wrong={wrongAnswersCount} />
      <SingleNote note={note} octave={octave} />
      <SelectNote
        onSelectNote={onSelectNote}
        ref={noteSelector}
        isDisabled={disableSelector}
      />
    </div>
  );
};

export default GuessSingleNote;
