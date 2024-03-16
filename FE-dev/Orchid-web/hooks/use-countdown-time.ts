import { useState, useEffect } from "react";

export const adjustTimeZoneOffset = (dateString: Date, offset: number) => {
  const date = dateString ? new Date(dateString) : undefined;

  if (date) {
    date.setHours(date.getHours() + offset);
    return date.toISOString().replace("Z", "");
  } else {
    return undefined;
  }
};


function useCountdownTimer(
  targetDateStr: string | undefined
): { days: number; hours: number; minutes: number; seconds: number } | null {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (targetDateStr) {
      const targetDate = new Date(targetDateStr).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining > 0) {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          setCountdown({ days, hours, minutes, seconds });
        } else {
          clearInterval(intervalId);
          setCountdown(null);
        }
      };

      // Update countdown every second
      intervalId = setInterval(updateCountdown, 1000);

      // Initial update
      updateCountdown();
    }

    return () => clearInterval(intervalId);
  }, [targetDateStr]);

  return countdown;
}

export default useCountdownTimer;


