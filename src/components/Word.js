import { Text } from "@chakra-ui/react";

export default function Word({ word, finished, justFinished, active, typed }) {
  /**
   * Static Display means the word is displayed in full without any splitting, this is used for performance
   */
  var staticDisplay = !finished && !active && !typed;
  var staticDisplayCorrect = false;

  if (finished && !active && typed === word) {
    staticDisplay = true;
    staticDisplayCorrect = true;
  }

  return (
    <Text
      display="inline-block"
      mr="10px"
      color={staticDisplayCorrect ? "blue.400" : active ? "black" : "gray.600"}
      position="relative"
    >
      {staticDisplay ? (
        word
      ) : (
        <>
          {word.split("").map((char, j) => {
            var punched = typed && j < typed.length;
            var correct = typed && char === typed[j];

            var cursorPos = active && j == typed.length;

            if (finished) {
              punched = true;
            }

            return (
              <Text
                display="inline-block"
                color={punched ? (correct ? "blue.400" : "red.400") : undefined}
                textDecoration={punched && !correct ? "line-through" : ""}
                key={j}
                as="span"
                id={cursorPos ? "active-key" : ""}
              >
                {char}
              </Text>
            );
          })}
          {active && typed.length === word.length ? (
            <Text
              display="inline-block"
              as="span"
              id={"active-key"}
              width="0px"
              opacity="0"
            >
              a
            </Text>
          ) : null}
          {typed
            ? typed
                .slice(word.length)
                .split("")
                .map((char, j) => {
                  return (
                    <Text
                      display="inline-block"
                      color="red.400"
                      textDecoration={"line-through"}
                      key={j}
                      as="span"
                    >
                      {char}
                    </Text>
                  );
                })
            : ""}

          {active && typed.length > word.length ? (
            <Text
              display="inline-block"
              as="span"
              id={"active-key"}
              width="0px"
              opacity="0"
            >
              a
            </Text>
          ) : null}
        </>
      )}
    </Text>
  );
}
