import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const historyUpdated = [...history];

    if (replace) {
      historyUpdated.pop();
    }
    historyUpdated.push(newMode);
    setHistory(historyUpdated);
    setMode(newMode);
  }

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
