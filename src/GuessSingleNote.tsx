import { useRef, useState } from "react";
import Results from "./Results";
import SelectNote, { NoteSelectorRef } from "./SelectNote";
import SingleNote from "./SingleNote";
import { DisplayedNote, Note, NoteData, Octave } from "./types";
import { generateRandomNote, getRandomClef } from "./utils";

const randomNoteRange = {
  min: { note: Note.Do, octave: Octave.Great },
  max: { note: Note.Si, octave: Octave.Line2 },
};

const GuessSingleNote = () => {
  const [displayedNote, setDisplayedNote] = useState<DisplayedNote>();
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [disableSelector, setDisableSelector] = useState(false);
  const noteSelector = useRef<NoteSelectorRef | null>(null);

  const indicatorTimeout = 500;
  const beepRight = new Audio("./beep_right.mp3");
  const beepWrong = new Audio("./beep_wrong.mp3");

  const updateNote = () => {
    let newNote: DisplayedNote | undefined;
    let randomNote: NoteData;
    let retriesLeft = 10;
    while (retriesLeft > 0) {
      randomNote = generateRandomNote(randomNoteRange);
      newNote = { ...randomNote, clef: getRandomClef(randomNote) };

      if (
        (newNote && !displayedNote) ||
        (displayedNote &&
          (newNote.note != displayedNote.note ||
            newNote.octave != displayedNote.octave ||
            newNote.clef != displayedNote.clef))
      ) {
        break;
      }
      retriesLeft--;
    }
    if (!retriesLeft || !newNote) {
      throw new Error("Couldn't generate new note after multiple retries!");
    }
    setDisplayedNote(newNote);
  };

  if (!displayedNote) {
    updateNote();
    return <div></div>;
  }

  const { note, octave, clef } = displayedNote;

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
      <SingleNote note={note} octave={octave} clef={clef} />
      <SelectNote
        visibleOctaves={[
          Octave.Great,
          Octave.Small,
          Octave.Line1,
          Octave.Line2,
          Octave.Line3,
        ]}
        onSelectNote={onSelectNote}
        ref={noteSelector}
        isDisabled={disableSelector}
      />
    </div>
  );
};

export default GuessSingleNote;
