export const saveLocalStorage = (key: string, value: unknown): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string): unknown | false => {
  if (typeof window === "undefined") {
    return false;
  }

  const item = localStorage.getItem(key);
  if (item) {
    try {
      const data = JSON.parse(item);
      return data;
    } catch (error) {
      console.error("Failed to parse JSON from localStorage:", error);
      return false;
    }
  }
  return false;
};

export const removeLocalStorage = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
};
