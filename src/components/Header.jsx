import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      bg="tomato"
      w="100%"
      p={4}
      color="white"
      borderRadius={"10px"}
      margin="10px 0px"
    >
      <Text fontSize={{ lg: "30px", sm: "20px" }}>Hacker News 2.0</Text>
    </Box>
  );
};

export default Header;
