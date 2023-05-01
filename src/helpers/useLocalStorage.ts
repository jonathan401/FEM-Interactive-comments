import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, fallback: any) => {
  const storedValue = localStorage.getItem(key);
  let parsedValue;

  if (storedValue !== null) parsedValue = JSON.parse(storedValue);

  const [value, setValue] = useState(storedValue ? parsedValue : fallback);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
