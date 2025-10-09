import { useCallback, useEffect, useState } from "react";

export const useTimer = (initialSeconds = 0) => {
  const [timePassed, setTimePassed] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      setTimePassed(initialSeconds);
    }
  }, [initialSeconds, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setTimePassed((prevTimePassed) => prevTimePassed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = useCallback(() => {
    setIsRunning((running) => {
      if (running) {
        return running;
      }
      return true;
    });
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback((value = 0) => {
    setTimePassed(value);
    setIsRunning(false);
  }, []);

  return {
    timePassed,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
  };
};
