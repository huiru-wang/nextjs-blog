"use client";

import React, { useState, useEffect } from "react";

export default function HeroAnimation({ text, speed = 100 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true); // For blinking cursor

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        // Typing forward
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Stop blinking cursor after text is fully displayed
        setShowCursor(false);
      }
    }, speed);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [currentIndex, text, speed]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <p className="text-xl sm:text-2xl lg:text-3xl">
      <span className="sm:bg-gradient-to-r to-foreground bg-gradient-to-t to-70% from-muted-foreground bg-clip-text font-semibold">
        {displayText}
      </span>
      <span className={`${showCursor ? "text-muted-foreground" : "hidden"}`}>
        |
      </span>
    </p>
  );
}