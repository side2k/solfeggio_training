import { FunctionComponent } from "react";

const Results: FunctionComponent<{ right: number; wrong: number }> = (
  props
) => {
  return (
    <div className="flex justify-center">
      <div className="text-6xl text-green-500">{props.right}</div>
      <div className="text-6xl px-5">:</div>
      <div className="text-6xl text-red-500">{props.wrong}</div>
    </div>
  );
};

export default Results;
