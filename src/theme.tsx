import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#528BBF",
      51: "#D9D9D9",
      52: "#6E9CC7",
      53: "#DCE3F3",
      54: "#014ED5",
      55: "#D1D6E0",
      56: "#738CE2AD",
      57: "#000000",
      58: "#004F95",
      59: "#FFFFFF",
      60: "#CFD5E1",
    },
    variant: {
      1: "solid",
      2: "outline",
    },
  },
  fonts: {
    heading: "Stoke",
    body: "Poppins",
  },
});

export default theme;
