import { FunctionComponent, useEffect, useState } from "react";

const Timer: FunctionComponent<{ isActive: boolean }> = ({ isActive }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setSecondsPassed(secondsPassed + 1), 1000);
    }
  }, [secondsPassed, isActive]);

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
