import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.04);
  padding: 32px;
`;

export const Card = ({ children, ...props }) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};
