import { useState, useImperativeHandle, forwardRef } from "react";
import { noteToShortName } from "./utils";
import { Note, Octave, NoteData } from "./types";

enum IndicatorState {
  Normal = 0,
  Right,
  Wrong,
}
type NoteSelectEvent = (selectedNote: NoteData) => void;
type SelectNoteProps = {
  onSelectNote: NoteSelectEvent;
  isDisabled: boolean;
  visibleOctaves: Octave[];
};

export type NoteSelectorRef = {
  indicateRight: (timeout: number) => void;
  indicateWrong: (timeout: number) => void;
};

const SelectNote = forwardRef<NoteSelectorRef, SelectNoteProps>(
  (props, ref) => {
    const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);
    const [indicateState, setIndicateState] = useState<IndicatorState>(
      IndicatorState.Normal
    );

    const getNoteClickEvent = ({ note, octave }: NoteData) => {
      return () => {
        setSelectedNote({ note, octave });
        props.onSelectNote({ note, octave });
      };
    };

    useImperativeHandle(ref, () => ({
      indicateRight: (timeout: number) => {
        setIndicateState(IndicatorState.Right);
        setTimeout(() => setIndicateState(IndicatorState.Normal), timeout);
      },
      indicateWrong: (timeout: number) => {
        setIndicateState(IndicatorState.Wrong);
        setTimeout(() => setIndicateState(IndicatorState.Normal), timeout);
      },
    }));

    return (
      <div className="note-selector">
        {props.visibleOctaves.map((octave, key) => (
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
                    ? indicateState === IndicatorState.Right
                      ? "bg-green-500"
                      : indicateState === IndicatorState.Wrong
                      ? "bg-red-500"
                      : "bg-none"
                    : ""
                }
                `}
                >
                  {noteToShortName({ note, octave })}
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
