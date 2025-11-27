import { useEffect, useRef, useState } from "react";

export default function Countdown({ expiry }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: "0",
    minutes: "00",
    seconds: "00",
  });
  const cancelId = useRef(null);

  function getTimeLeft() {
    const totalSeconds = Math.floor((expiry - Date.now()) / 1000);
    const pad = (num, length) => num.toString().padStart(length, "0");

    if (totalSeconds > 0) {
      const hours = Math.floor((totalSeconds / 3600) % 24);
      const minutes = pad(Math.floor((totalSeconds / 60) % 60), 2);
      const seconds = pad(totalSeconds % 60, 2);

      setTimeLeft({
        hours,
        minutes,
        seconds,
      });

      cancelId.current = requestAnimationFrame(getTimeLeft);
    } else {
      setTimeLeft({ hours: "0", minutes: "00", seconds: "00" });
      cancelAnimationFrame(cancelId.current);
    }
  }

  useEffect(() => {
    cancelId.current = requestAnimationFrame(getTimeLeft);

    return () => {
      if (cancelId.current) {
        cancelAnimationFrame(cancelId.current);
      }
    };
  }, []);

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}
