import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsContent } from "../App";
import Countdown from "../components/Countdown";
import Word from "../components/Word";
import { Passages } from "../data/Passages";

export default function PageIndex() {
  var { results, setResults } = useContext(ResultsContent);
  var navigate = useNavigate();

  var [index, setIndex] = useState(0);
  var [words, setWords] = useState([]);
  var wordsRef = useRef();

  function randomizePassage() {
    var passage = Passages[Math.floor(Math.random() * Passages.length)];

    passage = passage.trim();

    var newWords = passage.split(" ");

    wordsRef.current = newWords;
    setWords(newWords);
  }

  var [started, setStarted] = useState();
  var [endsAt, setEndsAt] = useState();
  var [startedAt, setStartedAt] = useState();
  var data = useRef();

  var [currentTyping, setCurrentTyping] = useState("");
  var currentTypingRef = useRef("");
  var finishedWords = useRef([]);
  var cursorRef = useRef();

  var blinkRef = useRef();

  /**
   * Called when out of time or user finishes all words
   */
  function endTyping() {
    var durationMs = Date.now() - startedAt;
    var durationSeconds = durationMs / 1000;
    var durationMinutes = durationSeconds / 60;

    var wpm = data.current.words / durationMinutes;
    var accuracyPercentage =
      (data.current.words - data.current.mistakes) / data.current.words;

    accuracyPercentage = Math.max(0, accuracyPercentage);

    setResults({
      wpm: wpm,
      accuracyPercentage: accuracyPercentage,
      mistakes: data.current.mistakes,
      words: data.current.words,
      durationMs,
      typoWords: Object.keys(data.current.typoWords),
      typoKeys: data.current.typoKeys,
    });

    navigate("/results");
  }

  /**
   * Called every key press to update cursor position
   */
  const onPosition = () => {
    setTimeout(() => {
      var el = document.getElementById("active-key");
      if (el && cursorRef.current) {
        var rect = el.getBoundingClientRect();

        cursorRef.current.style.transform =
          "translate(" + rect.x + "px," + (rect.y + window.scrollY) + "px)";

        var id = {};
        blinkRef.current = id;

        cursorRef.current.classList.remove("blinking");

        setTimeout(() => {
          if (blinkRef.current == id) {
            cursorRef.current.classList.add("blinking");
          }
        }, 800);
      }
    }, 20);
  };

  /**
   * Called to start the typing session
   */
  function start() {
    // START
    setStartedAt(Date.now());
    setEndsAt(Date.now() + 1000 * 60);

    // Reset data
    data.current = {
      mistakes: 0,
      words: 0,
      typoWords: {},
      typoKeys: {},
    };
  }

  useEffect(() => {
    /**
     * @param {KeyboardEvent} e
     */
    const keypressCb = (e) => {
      setStarted((started) => {
        if (!started) {
          start();
          return true;
        }

        return started;
      });
      if (e.key === " ") {
        e.preventDefault();

        var receivedWord = currentTypingRef.current;

        // Move to next word
        setIndex((index) => {
          var expectedWord = wordsRef.current[index];
          if (expectedWord && expectedWord !== receivedWord) {
            data.current.mistakes++;
            data.current.typoWords[expectedWord] = true;
          }

          if (index + 1 > wordsRef.current.length - 1) {
            endTyping();
          }

          return index + 1;
        });

        // Increment words counter
        if (receivedWord) {
          data.current.words++;
        }

        finishedWords.current.push(currentTypingRef.current);
        // console.log(finishedWords.current, index + 1);

        setCurrentTyping("");
        currentTypingRef.current = "";

        onPosition();
      } else {
        var charPos = currentTypingRef.current.length;

        setIndex((index) => {
          var expectedWord = wordsRef.current[index];

          if (expectedWord && expectedWord[charPos] !== e.key) {
            data.current.typoWords[expectedWord] = true;

            var key = e.key.toLowerCase();
            if (!data.current.typoKeys[key]) {
              data.current.typoKeys[key] = 1;
            } else {
              data.current.typoKeys[key]++;
            }
          }

          return index;
        });

        setCurrentTyping((currentTyping) => currentTyping + e.key);
        currentTypingRef.current = currentTypingRef.current + e.key;

        onPosition();
      }
    };

    /**
     * @param {KeyboardEvent} e
     */
    const keydownCb = (e) => {
      if (e.which === 8) {
        e.preventDefault();

        if (currentTypingRef.current.length) {
          // backspace one character

          currentTypingRef.current = currentTypingRef.current.slice(
            0,
            currentTypingRef.current.length - 1
          );

          setCurrentTyping((currentTyping) =>
            currentTyping.substring(0, currentTyping.length - 1)
          );

          onPosition();
        } else {
          // empty, go back a word

          // console.log(finishedWords.current, index - 1);

          setIndex((index) => Math.max(0, index - 1));

          // get previous typed word
          var previousTyping = finishedWords.current.pop() || "";

          setCurrentTyping(previousTyping);
          currentTypingRef.current = previousTyping;

          onPosition();
        }
      }
    };

    const scrollCb = () => {
      onPosition();
    };

    /**
     * Choose a random passage
     */
    randomizePassage();

    /**
     * Listen for events
     */
    window.addEventListener("keypress", keypressCb);
    window.addEventListener("keydown", keydownCb);
    window.addEventListener("scroll", scrollCb);

    onPosition();

    return () => {
      /**
       * Cleanup events
       */
      window.removeEventListener("keypress", keypressCb);
      window.removeEventListener("keydown", keydownCb);
      window.removeEventListener("scroll", scrollCb);
    };
  }, []);

  return (
    <Box>
      <Box py={40} maxWidth="4xl" mx="auto" fontSize="4xl">
        <Box textAlign="center" fontSize="2xl" mb={4} color="gray.500">
          {started ? (
            <Countdown
              endsAt={endsAt}
              onEnd={() => {
                endTyping();
              }}
            />
          ) : (
            <Text color="gray.400" fontStyle="italic">
              Press any key to start
            </Text>
          )}
        </Box>

        <Box
          ref={cursorRef}
          bg="blue.400"
          w="2px"
          height="40px"
          position="absolute"
          top="4px"
          left="0px"
          transform=""
          transition="transform 0.1s ease"
          className="blinking"
          opacity="1"
        ></Box>
        <Box>
          {words.map((word, i) => {
            var active = i === index;
            var finished = i < index;

            return (
              <Word
                key={i}
                word={word}
                active={active}
                finished={finished}
                justFinished={!currentTyping ? i === index - 1 : false}
                typed={
                  finished
                    ? finishedWords.current[i]
                    : active
                    ? currentTyping
                    : undefined
                }
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
