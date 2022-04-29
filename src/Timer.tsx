import { FunctionComponent, useEffect, useRef, useState } from "react";

const Timer: FunctionComponent<{ isActive: boolean }> = ({ isActive }) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const timer = useRef<number>();

  useEffect(() => {
    if (isActive) {
      timer.current = setTimeout(
        () => setSecondsPassed(secondsPassed + 1),
        1000
      );
    } else if (timer.current) {
      clearTimeout(timer.current);
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
