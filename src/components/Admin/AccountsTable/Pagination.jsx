import styled from "styled-components";
import { Button, Text } from "../..";
import { ReactComponent as ChevronLeft } from "../../common/Icons/ChevronLeft.svg";
import { ReactComponent as ChevronRight } from "../../common/Icons/ChevronRight.svg";

const NavButton = styled(Button).attrs(() => ({ variant: "unstyled" }))`
  background-color: ${({ theme }) => theme.colors.grey100};
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grey800};
  height: 24px;
  width: 24px;
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
      <NavButton onClick={previousPage}>
        <ChevronLeft style={{ height: "20px", width: "20px" }} />
      </NavButton>
      <Text style={{ marginRight: "8px" }}>
        {pageIndex + 1} of {pageCount}
      </Text>
      <NavButton onClick={nextPage}>
        <ChevronRight style={{ height: "20px", width: "20px" }} />
      </NavButton>
    </div>
  );
};
