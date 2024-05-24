import { useState, useEffect } from "react";

export const useTimer = () => {
  const [startTime, setStartTime] = useState<number>(0);
  const [timePassed, setTimePassed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any;

    if (isRunning) {
      timer = setInterval(() => {
        setTimePassed((prevTimePassed) => prevTimePassed + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      const currentTime = Math.floor(Date.now() / 1000);
      setStartTime(currentTime - timePassed);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setTimePassed(0);
  };

  const getTimePassed = () => {
    return timePassed;
  };

  return {
    startTime,
    startTimer,
    stopTimer,
    resetTimer,
    getTimePassed,
    isRunning,
  };
};
