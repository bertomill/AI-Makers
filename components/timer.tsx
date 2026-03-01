"use client";

import { useState, useEffect, useCallback } from "react";

const TOTAL_SECONDS = 55 * 60; // 55 minutes

export function Timer({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const reset = useCallback(() => {
    setRunning(false);
    setSecondsLeft(TOTAL_SECONDS);
  }, []);

  const toggleRunning = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = 1 - secondsLeft / TOTAL_SECONDS;
  const isLow = secondsLeft <= 5 * 60 && secondsLeft > 0;

  if (!visible) return null;

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col items-end gap-2">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm">
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Build Timer
          </span>
          <span
            className={`font-mono text-3xl font-semibold tabular-nums ${
              isLow ? "text-destructive" : "text-foreground"
            }`}
          >
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={toggleRunning}
            className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            aria-label={running ? "Pause timer" : "Start timer"}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Reset timer"
          >
            Reset
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? "bg-destructive" : "bg-accent"
          }`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {/* Close button */}
      <button
        onClick={onToggle}
        className="text-xs text-muted-foreground hover:text-foreground"
        aria-label="Hide timer"
      >
        Hide (T)
      </button>
    </div>
  );
}
