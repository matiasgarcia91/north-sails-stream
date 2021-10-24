import styled from "styled-components";
import { Button, Text } from "../..";

const NavButton = styled(Button).attrs(() => ({ variant: "unstyled" }))`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.grey100};
  margin-right: 8px;
`;

export const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  nextPage,
  previousPage,
  pageIndex,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <NavButton onClick={previousPage}>Prev</NavButton>
      <Text style={{ marginRight: "8px" }}>
        {pageIndex + 1} of {pageCount}
      </Text>
      <NavButton onClick={nextPage}>next</NavButton>
    </div>
  );
};
