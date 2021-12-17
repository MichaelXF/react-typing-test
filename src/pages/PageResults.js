import { Box, Fade, Flex, Text } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { ResultsContent } from "../App";
import { useNavigate } from "react-router-dom";
import Keyboard from "../components/Keyboard";
import Panel from "../components/Panel";
import CountUp from "react-countup";

export default function PageResults() {
  var { results, setResults } = useContext(ResultsContent);
  var navigate = useNavigate();

  var [show, setShow] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShow(1);

      setTimeout(() => {
        setShow(2);
        setTimeout(() => {
          setShow(3);
          setTimeout(() => {
            setShow(4);
          }, 400);
        }, 1800);
      }, 1100);
    }, 100);
  }, []);

  if (!results) {
    setTimeout(() => {
      navigate("/");
    }, 100);
    return <></>;
  }

  return (
    <Box>
      <Box py={20} my={10} maxWidth="4xl" mx="auto" fontSize="4xl">
        <Fade in={show > 0}>
          <Text textAlign="center">
            You finished with{" "}
            <CountUp
              duration={1}
              start={0}
              end={show > 0 ? Math.floor(results.wpm) : 0}
            />{" "}
            WPM.
          </Text>
        </Fade>

        <Box fontSize="md">
          <Flex>
            <Box width="50%" pr={1}>
              <Fade in={show > 1}>
                <Panel heading="Accuracy">
                  <CountUp
                    start={0}
                    end={Math.floor((results.accuracyPercentage || 0) * 100)}
                    suffix="%"
                    delay={1.6}
                    duration={1}
                  />
                </Panel>
              </Fade>
            </Box>
            <Box width="50%" pl={1}>
              <Fade in={show > 2}>
                <Panel heading="Mistakes">
                  <CountUp
                    start={0}
                    end={Math.floor(results.mistakes)}
                    delay={3}
                    duration={1}
                  />
                </Panel>
              </Fade>
            </Box>
          </Flex>
        </Box>

        <Box pt={2} fontSize="md" textAlign="center">
          <Text color="gray.500" mb={4}>
            Typos
          </Text>
          <Box>
            {results.typoWords.sort().map((word) => {
              return (
                <Text
                  color="red.400"
                  display="inline-block"
                  bg="RGBA(245, 101, 101, 0.2)"
                  p={2}
                  borderRadius="6px"
                  mx={1}
                >
                  {word}
                </Text>
              );
            })}
          </Box>
        </Box>

        <Box pt={10} fontSize="md" textAlign="center">
          <Text color="gray.500" mb={5}>
            Typos (mapped on Keyboard)
          </Text>
          <Keyboard typoKeys={results.typoKeys} />
        </Box>
      </Box>
    </Box>
  );
}
