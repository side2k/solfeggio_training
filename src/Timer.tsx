import { FunctionComponent, useEffect, useState } from "react";

const Timer: FunctionComponent = () => {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    setTimeout(() => setSecondsPassed(secondsPassed + 1), 1000);
  }, [secondsPassed]);

  const minutes = Math.floor(secondsPassed / 60);
  const seconds = secondsPassed - minutes * 60;
  return (
    <div>
      <div className="text-6xl">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;
