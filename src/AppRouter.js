import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import PageIndex from "./pages/PageIndex";
import PageResults from "./pages/PageResults";

export default function AppRouter() {
  return (
    <Flex minHeight="100vh" direction="column">
      <Box height="100%" flexGrow={1}>
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/results" element={<PageResults />} />
        </Routes>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Flex>
  );
}
