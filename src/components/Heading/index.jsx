import styled from "styled-components";
import { variant } from "styled-system";

export const variants = {
  h1: {
    fontSize: ["heading"],
  },
  h2: {
    fontSize: ["28px", 8],
  },
  h3: {
    fontSize: ["28px", 6],
  },
  h4: {
    fontSize: [3, "36px"],
  },
  h5: {
    fontSize: [2, 3],
  },
  h6: {
    fontSize: [2],
  },
};

export const Heading = styled.div`
  font-family: ${(p) => p.theme.fonts.heading};
  font-weight: ${(p) => p.theme.fontWeights.extraBold};
  color: ${(p) => p.theme.colors.grey900};

  ${variant({ variants })}
`;
