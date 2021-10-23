import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

const variants = {
  primary: {
    backgroundColor: "primary",
  },
  secondary: {
    backgroundColor: "secondary",
  },
  outline: {
    border: "solid 2px",
    borderColor: "primary",
    color: "primary",
  },
};

const StyledButton = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  color: ${(p) => p.theme.colors.white};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes[2]};

  ${variant({ variants })}
`;

export const Button = ({ children, variant = "primary", ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {/* <Icon as="span" className="button-background" icon={ButtonIcon} /> */}
      {children}
    </StyledButton>
  );
};
