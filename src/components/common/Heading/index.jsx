import styled from "styled-components";
import { variant } from "styled-system";

export const variants = {
  h1: {
    fontSize: "32px",
  },
  h2: {
    fontSize: "24px",
  },
  h3: {
    fontSize: "24px",
  },
  h4: {
    fontSize: "24px",
  },
  h5: {
    fontSize: [2, 3],
  },
  h6: {
    fontSize: [2],
  },
};

export const Heading = styled.div`
  font-family: ${p => p.theme.fonts.heading};
  font-weight: ${p => p.theme.fontWeights.extraBold};
  color: ${p => p.theme.colors.grey900};

  ${variant({ variants })}
`;
