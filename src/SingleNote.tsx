import { renderAbc } from "abcjs";
import { FunctionComponent, useEffect, useRef } from "react";
import { Clef, NoteData } from "./types";

function noteToNotation({ note, octave }: NoteData) {
  const startOctave = 4;
  const delta = octave - startOctave;

  if (delta === 0) {
    return note;
  } else if (delta < 0) {
    return note + ",".repeat(-delta);
  }

  return note.toLowerCase() + "'".repeat(delta - 1);
}

type NoteDisplayProps = NoteData & { clef: Clef };

const SingleNote: FunctionComponent<NoteDisplayProps> = ({
  note,
  octave,
  clef,
}) => {
  const abcRef = useRef<HTMLDivElement>(null);

  const staveData = `
  L: 1/4
  K: clef=${clef}
  ${noteToNotation({ note, octave })}`;

  useEffect(() => {
    if (!abcRef.current) {
      return;
    }
    renderAbc(abcRef.current.id, staveData, { staffwidth: 400, scale: 3.3 });
  }, [staveData]);

  return <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />;
};

export default SingleNote;
