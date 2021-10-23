import styled from "styled-components";

export const Divider = styled.div`
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey100};
  margin-top: 24px;
  margin-bottom: 24px;
`;
