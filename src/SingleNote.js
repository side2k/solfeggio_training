import { useRef, useEffect } from "react";
import { renderAbc } from "abcjs";

var demoAbc = "T: Какая это нота?\n" + "L: 1/4\n" + "K: clef=treble\n" + "c";

const SingleNote = () => {
  const abcRef = useRef();

  useEffect(() => {
    console.log(abcRef.current);
    renderAbc(abcRef.current.id, demoAbc);
  }, []);
  return (
    <div>
      <div id={"abcjs-result"} style={{ width: "100%" }} ref={abcRef} />
    </div>
  );
};

export default SingleNote;
