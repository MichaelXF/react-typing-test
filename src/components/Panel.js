import { Box, Text } from "@chakra-ui/react";

export default function Panel({ heading, children }) {
  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px"
      p={6}
      borderRadius={4}
      mb={8}
    >
      <Text color="gray.500" mb={2}>
        {heading}
      </Text>

      <Text fontSize="4xl" fontWeight="bold" lineHeight={1}>
        {children}
      </Text>
    </Box>
  );
}
