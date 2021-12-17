import { Box, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex bg="gray.200" p={4} justify="center">
      <Text>React Typing Test</Text>
      <Text ml={4} color="gray.600">
        Made by MichaelXF
      </Text>
    </Flex>
  );
}
