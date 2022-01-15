import { useMemo, forwardRef, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useRowSelect, usePagination, useSortBy } from "react-table";
import styled from "styled-components";

import { Button, Spinner, Select } from "../..";
import {
  deleteUsers,
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
import { ReactComponent as AddAccount } from "../../common/Icons/AddAccount.svg";

import { TableButton } from "../TableButton";
import { NewRow } from "./NewRow";
import { DeleteAccountsModal } from "./DeleteAccountsModal";

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
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  );
});

export default function DataTable() {
  const dispatch = useDispatch();
  const [seePassword, setSeePassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

  const [addingRow, setAddingRow] = useState(false);

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID" },
      { accessor: "fullName", Header: "Full Name" },
      { accessor: "email", Header: "Email" },
      { accessor: "password", Header: "Password" },
      { accessor: "admin", Header: "Role" },
      { accessor: "emailSent", Header: "Emails sent" },
      { accessor: "emailOpened", Header: "Email opened" },
      { accessor: "hasLoggedIn", Header: "Has logged in" },
      { accessor: "actions", Header: "Actions" },
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
    {
      columns,
      data,
      initialState: { pageSize: 20, sortBy: [{ id: "id", desc: true }] },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks?.visibleColumns?.push((columns) => [
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
    const parsedContent = content.replace(/(?:\r\n|\r|\n)/g, "<br />");
    dispatch(
      sendEmailCampaign({
        content: parsedContent,
        subject,
        all,
        userIds: selectedAccountIds,
      })
    );
  };

  const deleteAccounts = ({ userIds }) => {
    dispatch(deleteUsers({ userIds }));
  };

  const openModal = (content) => {
    if (content === "email") {
      setModalOpen("email");
    } else if (content === "deleteAccounts") {
      setModalOpen("deleteAccounts");
    }
  };

  const dropDownOptions = [
    { label: "Send Emails", handler: () => openModal("email") },
    { label: "Delete Users", handler: () => openModal("deleteAccounts") },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <SendEmailModal
        isOpen={modalOpen === "email"}
        selected={selectedFlatRows}
        closeModal={() => setModalOpen(null)}
        sendEmail={sendEmail}
        isLoading={isLoading.emailForm}
        totalRows={accounts?.length}
      />
      <DeleteAccountsModal
        isOpen={modalOpen === "deleteAccounts"}
        selected={selectedFlatRows}
        closeModal={() => setModalOpen(null)}
        deleteAccounts={deleteAccounts}
        isLoading={isLoading.deleteUsers}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <TableButton
            icon={AddAccount}
            style={{ marginRight: "15px" }}
            onClick={() => setAddingRow(!addingRow)}
          />
          <Select options={dropDownOptions}>
            {selectedFlatRows?.length
              ? `${selectedFlatRows?.length} Bulk Actions`
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
            variant='secondary'
            onClick={refetch}
            style={{
              width: "40px",
              height: "40px",
              marginRight: "16px",
              borderRadius: "50%",
              minWidth: "0px",
              padding: "0px",
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
              {headerGroup?.headers.map((column) => {
                const sort = column.id !== "password";
                const headerProps = sort
                  ? column?.getHeaderProps(column.getSortByToggleProps())
                  : column.getHeaderProps();

                return (
                  <HeaderCell {...headerProps}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {column?.render("Header")}
                      {column?.id === "password" && (
                        <Button
                          variant='unstyled'
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
            {addingRow && (
              <NewRow
                Row={Row}
                Cell={Cell}
                columns={columns}
                setAddingRow={setAddingRow}
              />
            )}

            {page?.map((row) => {
              prepareRow(row);
              return (
                <Row {...row.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    const getContent = (cell) => {
                      switch (cell?.column?.id) {
                        case "password":
                          return (
                            <div>
                              {seePassword ? cell?.render("Cell") : "*******"}
                            </div>
                          );
                        case "admin":
                          return <div>{cell?.value && "Admin"}</div>;
                        case "emailSent":
                          return <div>{cell?.value}</div>;
                        case "emailOpened":
                          return <div>{cell?.value && "yes"}</div>;
                        case "hasLoggedIn":
                          return <div>{cell?.value && "yes"}</div>;
                        default:
                          return <div>{cell?.render("Cell")}</div>;
                      }
                    };
                    return (
                      <Cell {...cell?.getCellProps()}>{getContent(cell)}</Cell>
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
