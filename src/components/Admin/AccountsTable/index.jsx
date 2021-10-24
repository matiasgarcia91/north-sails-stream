import { useMemo, forwardRef, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useRowSelect, usePagination } from "react-table";
import styled from "styled-components";
import { Button } from "../..";
import { fetchUserAccounts } from "../../../store/admin/actions";
import {
  createdAccounts,
  isLoading as loadingSelector,
} from "../../../store/admin/selectors";
import { ReactComponent as Refresh } from "../../common/Icons/Refresh.svg";
import { Spinner } from "../../common/Spinner";
import { Pagination } from "./Pagination";
import { ReactComponent as EyeClosed } from "../../common/Icons/EyeClosed.svg";
import { ReactComponent as EyeOpen } from "../../common/Icons/EyeOpen.svg";

const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 14px;
  padding: 0;
  border-collapse: collapse;
  border-spacing: none;

  td:first-child,
  th:first-child {
    border-radius: 10px 0 0 10px;
  }
  td:last-child,
  th:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

const HeaderRow = styled.tr`
  height: 56px;
  color: ${({ theme }) => theme.colors.grey800};
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey100};
`;

const HeaderCell = styled.th`
  padding-left: 16px;
  padding-right: 16px;
`;

const Row = styled.tr`
  height: 56px;

  :nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.grey50};
  }
`;

const Cell = styled.td`
  padding-left: 16px;
  padding-right: 16px;
`;

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export default function DataTable() {
  const dispatch = useDispatch();
  const [seePassword, setSeePassword] = useState(false);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID" },
      { accessor: "fullName", Header: "Full Name" },
      { accessor: "email", Header: "Email" },
      { accessor: "password", Header: "Password" },
      { accessor: "admin", Header: "Admin" },
      { accessor: "emailSent", Header: "Email sent" },
      { accessor: "hasLoggedIn", Header: "Has logged in" },
    ],
    []
  );

  const isLoading = useSelector(loadingSelector);
  const accounts = useSelector(createdAccounts);

  const refetch = () => {
    dispatch(fetchUserAccounts());
  };

  const data = useMemo(() => [...accounts], [accounts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    { columns, data, initialState: { pageSize: 20 } },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  console.log("selected rows", selectedRowIds, selectedFlatRows);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          variant="unstyled"
          onClick={refetch}
          style={{ width: "24px", height: "24px" }}
        >
          <Refresh />
        </Button>
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          nextPage={nextPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
        />
      </div>

      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <HeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <HeaderCell {...column.getHeaderProps()}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {column.render("Header")}
                      {column.id === "password" && (
                        <Button
                          variant="unstyled"
                          onClick={() => setSeePassword(!seePassword)}
                          style={{
                            height: "20px",
                            width: "20px",
                            marginLeft: "8px",
                          }}
                        >
                          {seePassword ? <EyeClosed /> : <EyeOpen />}
                        </Button>
                      )}
                    </div>
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          ))}
        </thead>
        {!isLoading && (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Row {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Cell {...cell.getCellProps()}>
                        {cell.column.id === "password"
                          ? seePassword
                            ? cell.render("Cell")
                            : "********"
                          : cell.render("Cell")}
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
          </tbody>
        )}
      </Table>

      {isLoading && (
        <div
          style={{
            height: "1120px",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "560px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner size={100} />
          </div>
        </div>
      )}
    </div>
  );
}
