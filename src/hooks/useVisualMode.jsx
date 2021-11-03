import { useState } from "react";

export default function useVisualMode(initial) {
  //State management for mode and history
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //fn when transitioning to different states.
  function transition(newMode, replace = false) {
    const historyUpdated = [...history];

    if (replace) {
      historyUpdated.pop();
    }
    historyUpdated.push(newMode);
    setHistory(historyUpdated);
    setMode(newMode);
  }

  //fn to return to previous states
  function back() {
    const historyUpdated = [...history];
    if (historyUpdated.length > 1) {
      historyUpdated.pop();
      setMode(historyUpdated[historyUpdated.length - 1]);
      setHistory(historyUpdated);
    }
  }
  return { mode, transition, back };
}
