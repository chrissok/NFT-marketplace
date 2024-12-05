import { RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: VoidFunction
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // Ensure effect re-binds if ref or callback changes
};

export default useOutsideClick;
