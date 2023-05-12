import { useEffect, useState } from 'react';

export function useExpiryString(endTimestamp: number) {
  const [remaining, setRemaining] = useState<number>(
    new Date(endTimestamp * 1000).getTime() - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(
        new Date(endTimestamp * 1000).getTime() - new Date().getTime()
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [endTimestamp]);

  // generate a HH:MM:SS string from the remaining time without using ISO string, but modulo math instad
  const remainingString =
    remaining > 0
      ? `${Math.floor(remaining / 1000 / 60 / 60)
          .toString()
          .padStart(2, '0')}:${Math.floor((remaining / 1000 / 60) % 60)
          .toString()
          .padStart(2, '0')}:${Math.floor((remaining / 1000) % 60)
          .toString()
          .padStart(2, '0')}`
      : null;

  return remainingString;
}
