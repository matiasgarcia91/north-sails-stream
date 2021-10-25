import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  min-height: 160px;
  border-radius: 6px;
  border: 1px solid ${p => p.theme.colors.grey200};
  background: #faf9fd;
  font-family: inherit;
  box-sizing: border-box;
  &:hover,
  &:focus {
    border: 1px solid ${p => p.theme.colors.primary};
    outline: none;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 170px;
`;

const StyledLabel = styled.label`
  margin-bottom: 12px;
  font-weight: 700;
  color: ${p => p.theme.colors.grey400};
  font-size: 16px;
`;

export const Textarea = ({ children, variant = "primary", ...props }) => {
  return (
    <StyledDiv>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledDiv style={{ height: 32, width: "100%" }}>
        <StyledTextarea variant={variant} {...props}>
          {/* <Icon as="span" className="button-background" icon={ButtonIcon} /> */}
          {children}
        </StyledTextarea>
      </StyledDiv>
    </StyledDiv>
  );
};
