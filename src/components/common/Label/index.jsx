import styled from "styled-components";

const StyledLabel = styled.label`
  margin-bottom: 12px;
  font-weight: 700;
  color: ${(p) => p.theme.colors.grey400};
  font-size: 16px;
`;

export const Label = ({ children, variant = "primary", ...props }) => {
  return <StyledLabel>{children}</StyledLabel>;
};
