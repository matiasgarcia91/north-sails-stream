import styled from "styled-components";
import { Button } from "../..";

export const TableButton = styled(Button).attrs(() => ({
  variant: "unstyled",
}))`
  background-color: ${({ theme }) => theme.colors.grey50};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey400};
  color: ${({ theme }) => theme.colors.grey200};
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
`;
