import { NOTES, noteToShortName } from "./notes";

const visibleOctaves = [4, 5];
const SelectNote = ({ onSelectNote }) => {
  return (
    <div className="note-selector">
      {visibleOctaves.map((octave, key) => (
        <div className="grid grid-cols-7 gap-3 pb-2" key={key}>
          {NOTES.map((note, key) => (
            <div key={key}>
              <button
                onClick={() => {
                  onSelectNote({ selectedNote: note, selectedOctave: octave });
                }}
                className="rounded border border-black p-1"
              >
                {noteToShortName(note, octave)}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default SelectNote;
