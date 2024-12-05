import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920 // Default to 0 or a specific value if window is undefined
  );

  useEffect(() => {
    // Only set up the event listener on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenWidth;
};

export default useScreenWidth;
