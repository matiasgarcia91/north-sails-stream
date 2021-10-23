import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  background-color: ${(p) =>
    p.variant === "secondary"
      ? p.theme.colors.secondary
      : p.theme.colors.primary};
  padding: 8px;
  border-radius: 6px;
  color: ${(p) => p.theme.colors.white};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes[2]};
`;

export const Button = ({ children, variant = "primary" }) => {
  return (
    <StyledButton variant={variant}>
      {/* <Icon as="span" className="button-background" icon={ButtonIcon} /> */}
      {children}
    </StyledButton>
  );
};
