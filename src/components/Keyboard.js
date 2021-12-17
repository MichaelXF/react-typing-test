import { Box, Flex, Tooltip } from "@chakra-ui/react";
import mixColors from "../utils/mixColors";
import { ArrowBackIcon } from "@chakra-ui/icons";

const KeyGap = "6px";

function Key({ char, typos, max }) {
  var red = [245, 71, 71];
  var white = [45, 55, 72];

  var point = (typos || 0) / (max || 1);

  var bg = mixColors(red, white, Math.min(0.9, point));

  var width =
    {
      "\b": 115,
      "\\": 90,
      "\n": 140,
      "\t": 175,
    }[char] || 52;

  var display =
    {
      "\b": <ArrowBackIcon />,
      "\n": "ENTER",
      "\t": "SHIFT",
    }[char] || (char + "").toUpperCase();

  return (
    <Tooltip label={(typos || 0) + " typo" + (typos !== 1 ? "s" : "")}>
      <Flex
        width={width + "px"}
        height="52px"
        borderRadius="8px"
        mx={KeyGap}
        align="center"
        justify="center"
        bg={"rgba(" + bg.join(",") + ",1)"}
        color="white"
      >
        {display}
      </Flex>
    </Tooltip>
  );
}

export default function Keyboard({ typoKeys = {} }) {
  var max = 1;
  Object.keys(typoKeys).forEach((key) => {
    max = Math.max(max, typoKeys[key]);
  });

  return (
    <Flex justify="center" flexDirection="column">
      <Flex>
        {"1234567890-=\b".split("").map((char, i) => {
          return <Key key={i} char={char} typos={typoKeys[char]} max={max} />;
        })}
      </Flex>
      <Flex pl={6} pt={KeyGap}>
        {"qwertyuiop[]\\".split("").map((char, i) => {
          return <Key key={i} char={char} typos={typoKeys[char]} max={max} />;
        })}
      </Flex>
      <Flex pl={12} pt={KeyGap}>
        {"asdfghjkl;'\n".split("").map((char, i) => {
          return <Key key={i} char={char} typos={typoKeys[char]} max={max} />;
        })}
      </Flex>
      <Flex pl={"4.5rem"} pt={KeyGap}>
        {"zxcvbnm,./\t".split("").map((char, i) => {
          return <Key key={i} char={char} typos={typoKeys[char]} max={max} />;
        })}
      </Flex>
    </Flex>
  );
}
