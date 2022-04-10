import { useState, useImperativeHandle, forwardRef } from "react";
import { NOTES, noteToShortName } from "./notes";

const visibleOctaves = [4, 5];
const stateNormal = 0;
const stateIndicateRight = 1;
const stateIndicateWrong = 2;

const SelectNote = forwardRef(({ onSelectNote }, ref) => {
  const [selectedNote, setSelectedNote] = useState({
    selectedNote: null,
    selectedOctave: null,
  });

  const [indicateState, setIndicateState] = useState(stateNormal);

  const getNoteClickEvent = (note, octave) => {
    return () => {
      setSelectedNote({ note, octave });
      onSelectNote({ selectedNote: note, selectedOctave: octave });
    };
  };

  useImperativeHandle(ref, () => ({
    indicateRight: (timeout) => {
      setIndicateState(stateIndicateRight);
      setTimeout(() => setIndicateState(stateNormal), timeout);
    },
    indicateWrong: (timeout) => {
      setIndicateState(stateIndicateWrong);
      setTimeout(() => setIndicateState(stateNormal), timeout);
    },
  }));

  return (
    <div className="note-selector">
      {visibleOctaves.map((octave, key) => (
        <div className="grid grid-cols-7 gap-3 pb-2" key={key}>
          {NOTES.map((note, key) => (
            <div key={key}>
              <button
                onClick={getNoteClickEvent(note, octave)}
                className={`rounded border border-black p-1
                ${
                  note === selectedNote.note && octave === selectedNote.octave
                    ? indicateState === stateIndicateRight
                      ? "bg-green-500"
                      : indicateState === stateIndicateWrong
                      ? "bg-red-500"
                      : "bg-none"
                    : ""
                }
                `}
              >
                {noteToShortName(note, octave)}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
export default SelectNote;
