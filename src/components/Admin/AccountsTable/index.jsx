import { useMemo, forwardRef, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useRowSelect, usePagination } from "react-table";
import styled from "styled-components";
import { Dialog } from "@reach/dialog";

import { Button, Spinner, Select } from "../..";
import {
  fetchUserAccounts,
  sendEmailCampaign,
} from "../../../store/admin/actions";
import {
  createdAccounts,
  getAdminLoadingState,
} from "../../../store/admin/selectors";
import { Pagination } from "./Pagination";
import { SendEmailModal } from "./SendEmailModal";

import { ReactComponent as Refresh } from "../../common/Icons/Refresh.svg";
import { ReactComponent as EyeClosed } from "../../common/Icons/EyeClosed.svg";
import { ReactComponent as EyeOpen } from "../../common/Icons/EyeOpen.svg";
import "@reach/dialog/styles.css";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const isLoading = useSelector(getAdminLoadingState);
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

  const sendEmail = ({ content, subject, all }) => {
    const selectedAccountIds = selectedFlatRows?.map(
      (row) => row?.original?.id
    );
    dispatch(
      sendEmailCampaign({ content, subject, all, userIds: selectedAccountIds })
    );
  };

  const openModal = (content) => {
    if ("email") {
      console.log("email");
    } else {
      console.log("delete");
    }

    setModalOpen(true);
  };

  const dropDownOptions = [
    { label: "Send Emails", handler: () => openModal("email") },
    { label: "Delete Users", handler: () => openModal("delete") },
  ];

  return (
    <div style={{ width: "100%", marginTop: 20 }}>
      <Dialog
        isOpen={isModalOpen}
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.04)",
          padding: "32px",
        }}
      >
        <SendEmailModal
          selected={selectedFlatRows}
          closeModal={() => setModalOpen(false)}
          sendEmail={sendEmail}
          isLoading={isLoading.emailForm}
          totalRows={accounts?.length}
        />
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <Select options={dropDownOptions}>
            {selectedFlatRows.length
              ? `${selectedFlatRows.length} Bulk Actions`
              : "Bulk Actions"}
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="secondary"
            onClick={refetch}
            style={{
              width: "40px",
              height: "40px",
              marginRight: "16px",
              borderRadius: "50%",
              minWidth: "0px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                color: "#00e8af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Refresh />
            </div>
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
      </div>

      <Table {...getTableProps()}>
        <thead>
          {headerGroups?.map((headerGroup) => (
            <HeaderRow {...headerGroup?.getHeaderGroupProps()}>
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

        {!isLoading?.accounts && (
          <tbody {...getTableBodyProps()}>
            {page?.map((row) => {
              prepareRow(row);
              return (
                <Row {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    const getContent = (cell) => {
                      switch (cell.column.id) {
                        case "password":
                          return (
                            <div>
                              {seePassword ? cell.render("Cell") : "*******"}
                            </div>
                          );
                        case "admin":
                          return <div>{cell.value && "yes"}</div>;
                        case "emailSent":
                          return <div>{cell.value && "yes"}</div>;
                        case "hasLoggedIn":
                          return <div>{cell.value && "yes"}</div>;
                        default:
                          return <div>{cell.render("Cell")}</div>;
                      }
                    };

                    return (
                      <Cell {...cell.getCellProps()}>{getContent(cell)}</Cell>
                    );
                  })}
                </Row>
              );
            })}
          </tbody>
        )}
      </Table>

      {isLoading?.accounts && (
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
