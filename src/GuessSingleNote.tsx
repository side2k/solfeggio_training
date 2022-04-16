import { useState, useRef } from "react";
import SingleNote from "./SingleNote";
import SelectNote, { NoteSelectorRef } from "./SelectNote";
import Results from "./Results";

import { NOTES } from "./utils";
import { Note, Octave, NoteData } from "./types";

function generateRandomNote(): NoteData {
  const note = NOTES[Math.floor(Math.random() * NOTES.length)] as Note;
  const octaves = [4, 5];
  const octave = octaves[Math.floor(Math.random() * octaves.length)];
  return { note, octave };
}

const GuessSingleNote = () => {
  const [note, setNote] = useState<Note>();
  const [octave, setOctave] = useState<Octave>();
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [disableSelector, setDisableSelector] = useState(false);
  const noteSelector = useRef<NoteSelectorRef | null>(null);

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
    return <div></div>;
  }

  const onSelectNote = (selectedNote: NoteData) => {
    if (!noteSelector.current) {
      return <div></div>;
    }

    if (selectedNote.note === note && selectedNote.octave === octave) {
      noteSelector.current.indicateRight(indicatorTimeout);
      void beepRight.play();
      setRightAnswersCount(rightAnswersCount + 1);
      setDisableSelector(true);
      setTimeout(() => {
        updateNote();
        setDisableSelector(false);
      }, indicatorTimeout);
    } else {
      noteSelector.current.indicateWrong(indicatorTimeout);
      void beepWrong.play();
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
