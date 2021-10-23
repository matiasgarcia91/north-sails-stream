import space from "./space";

const theme = {
  colors: {
    primary: "#323353",
    secondary: "#9B51E0",
    transparent: "rgba(255, 255, 255, 0);",
    white: "#ffffff",
    black: "#34393E",
    grey50: "#F9F9FD",
    grey100: "#E1E1EE",
    grey200: "#A8A7B4",
    grey400: "#6B6B86",
    grey800: "#23243C",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 900,
  },
  fonts: {
    heading: `'Noto Sans', serif`,
    body: `'Noto Sans', serif`,
  },
  fontSizes: {
    1.25: space["1.25"],
    1.5: space["1.5"],
    1.75: space["1.75"],
    2: space["2"],
    2.25: space["2.25"],
    2.5: space["2.5"],
    3: space["3"],
    4: space["4"],
    5: space["5"],
    6: space["6"],
    7: space["7"],
    8: space["8"],
    10: space["9"],
    20: space["20"],
    root: space["1.75"],
    heading: space["4"],
  },
  lineHeights: {
    normal: 1,
    heading: 1.1,
    medium: 1.25,
    high: 1.6,
  },
  space: {
    ...space,
  },
  sizes: {
    maxWidth: 1260,
  },
  breakpoints: ["768px", "992px", "1024px", "1280px"],
  radii: {
    none: "0",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "16px",
    full: "9999px",
  },
  borders: {
    none: 0,
    "1px": "1px solid",
    "2px": "2px solid",
    "4px": "4px solid",
  },
  shadows: {
    sm: "0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)",
    md: "0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.05)",
    lg: "0px 2px 4px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1)",
    none: "none",
  },
};

theme.breakpoints.sm = theme.breakpoints[0];
theme.breakpoints.md = theme.breakpoints[1];
theme.breakpoints.lg = theme.breakpoints[2];
theme.breakpoints.xl = theme.breakpoints[3];

theme.breakpoints.maxXs = "767px";
theme.breakpoints.maxSm = "991px";
theme.breakpoints.maxMd = "1023px";
theme.breakpoints.maxLg = "1279px";

export default theme;
