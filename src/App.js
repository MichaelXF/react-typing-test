import { createContext, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import ScrollToTop from "./components/ScrollToTop";

export const ResultsContent = createContext({
  results: {
    wpm: 0,
    accuracyPercentage: 0,
    mistakes: 0,
    words: 0,
    durationMs: 0,
    typoWords: [],
    typoKeys: [],
  },
  setResults: () => {},
});

function App() {
  var [results, setResults] = useState();
  var resultsValue = useMemo(() => {
    return { results, setResults };
  }, [results]);

  return (
    <ResultsContent.Provider value={resultsValue}>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </ResultsContent.Provider>
  );
}

export default App;
