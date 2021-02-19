import { useState } from 'react';

export default function useVisualMode(initial) {

  // give useState the new version of what it should be
  // BE WARY OF THE TYPE OF VARIABLE THAT YOU ARE USING!!!
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // when do we use the spread operator, and when do we manipulate the state directly?

  // replace = false <-- default value, if replace isn't specified
  function transition(mode, replace = false) {
    if (replace) {
      // const updatedHistory = [...history];

      // updatedHistory = ['mode', 'mode', 'modeToReplace']
      // setting your history to: [['mode', mode', 'modeToReplace'], 'newMode'] ...updatedHistory
      // result after slice: ['mode', 'newMode']
      
      // Alternatively: prev callback:
      // refers to the previous state. Prevents "racing conditions" - when two functions try to change a variable at the same time
      setHistory(prev => [...prev.slice(0, prev.length-1), mode])
      setMode(mode);
      
    } else {
      // --------- original
      setMode(mode);
      // we need to add the new mode to our history:
      setHistory([...history, mode]);
    }
    };

    function back() {
      // set the mode to the previous item in our history array:
      if (history.length > 1) {
        const updatedHistory = [...history].slice(0, history.length-1);
        // avoid using .pop because it changes the original array
        setHistory(updatedHistory);
        setMode(updatedHistory[updatedHistory.length-1]);
      }
    };
    return { mode, transition, back }
  };