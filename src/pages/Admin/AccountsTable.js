import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fullName", headerName: "Full Name", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "password", headerName: "Password", width: 150 },
];

export default function DataTable(props) {
  const accountsWithId = props.accounts.map((a, i) => ({ ...a, id: i }));
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={accountsWithId}
        columns={columns}
        pageSize={20}
        checkboxSelection
      />
    </div>
  );
}
