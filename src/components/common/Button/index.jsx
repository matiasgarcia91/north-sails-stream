import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

const variants = {
  primary: {
    backgroundColor: "primary",
  },
  secondary: {
    border: "solid 2px",
    borderColor: "primary",
    color: "primary",
  },
  warning: {
    backgroundColor: "secondary",
  },
  unstyled: {
    color: "grey800",
    padding: 0,
    minWidth: 0,
  },
};

const StyledButton = styled.button`
  padding: 8px;
  min-width: 160px;
  border-radius: 6px;
  color: ${(p) => p.theme.colors.white};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes[2]};
  cursor: pointer;

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
