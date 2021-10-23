import styled from "styled-components";

const StyledDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  color: ${({ theme }) => theme.colors.grey800};
`;

export const Text = ({ children, ...props }) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};
