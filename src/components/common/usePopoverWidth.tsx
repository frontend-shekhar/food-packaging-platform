import { useState, useEffect, useCallback, useRef } from "react";

const usePopoverWidth = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState(0);

  const updatePopoverWidth = useCallback(() => {
    if (popoverRef.current) {
      setPopoverWidth(popoverRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updatePopoverWidth();
    window.addEventListener("resize", updatePopoverWidth);

    return () => {
      window.removeEventListener("resize", updatePopoverWidth);
    };
  }, [updatePopoverWidth]);

  return { popoverRef, popoverWidth };
};

export default usePopoverWidth;
