import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

const variants = {
  primary: { height: "32px" },
  small: { height: "16px" },
};

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  max-height: 32px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.colors.grey200};
  background: #faf9fd;
  font-family: inherit;

  &:hover,
  &:focus {
    border: 1px solid ${(p) => p.theme.colors.primary};
    outline: none;
  }

  ${variant({ variants })}
`;

const StyledDiv = styled.div`
  display: flex;
  max-width: 350px;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: 700;
  color: ${(p) => p.theme.colors.grey400};
  text-align: left;
  font-size: 16px;
`;

export const Checkbox = ({ children, variant = "primary", ...props }) => {
  return (
    <StyledDiv>
      <div>
        <StyledLabel>{props.label}</StyledLabel>
      </div>
      <StyledDiv
        style={{
          maxHeight: 32,
          minWidth: 28,
          marginLeft: variant === "primary" && 20,
        }}
      >
        <StyledInput variant={variant} {...props} type="checkbox">
          {/* <Icon as="span" className="button-background" icon={ButtonIcon} /> */}
          {children}
        </StyledInput>
      </StyledDiv>
    </StyledDiv>
  );
};
