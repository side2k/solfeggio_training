import { useState, useImperativeHandle, forwardRef } from "react";
import { noteToShortName } from "./utils";
import { Note, NoteData } from "./types";

const visibleOctaves = [4, 5];
const stateNormal = 0;
const stateIndicateRight = 1;
const stateIndicateWrong = 2;

type NoteSelectEvent = (selectedNote: NoteData) => void;
type SelectNoteProps = { onSelectNote: NoteSelectEvent; isDisabled: boolean };
type NoteSelectorRef = {
  indicateRight: (timeout: number) => void;
  indicateWrong: (timeout: number) => void;
};

const SelectNote = forwardRef<NoteSelectorRef, SelectNoteProps>(
  (props, ref) => {
    const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);
    const [indicateState, setIndicateState] = useState(stateNormal);

    const getNoteClickEvent = ({ note, octave }: NoteData) => {
      return () => {
        setSelectedNote({ note, octave });
        props.onSelectNote({ note, octave });
      };
    };

    useImperativeHandle(ref, () => ({
      indicateRight: (timeout: number) => {
        setIndicateState(stateIndicateRight);
        setTimeout(() => setIndicateState(stateNormal), timeout);
      },
      indicateWrong: (timeout: number) => {
        setIndicateState(stateIndicateWrong);
        setTimeout(() => setIndicateState(stateNormal), timeout);
      },
    }));

    return (
      <div className="note-selector">
        {visibleOctaves.map((octave, key) => (
          <div className="flex flex-row  gap-1 pb-2" key={key}>
            {Object.values(Note).map((note, key) => (
              <div key={key}>
                <button
                  disabled={props.isDisabled ? true : false}
                  onClick={getNoteClickEvent({ note, octave })}
                  className={`rounded border border-black p-1
                ${
                  selectedNote &&
                  note === selectedNote.note &&
                  octave === selectedNote.octave
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
  }
);

SelectNote.displayName = "SelectNote";

export default SelectNote;
