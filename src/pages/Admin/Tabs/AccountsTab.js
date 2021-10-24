import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import TextField from "@material-ui/core/TextField";
import AccountsTable from "../../../components/Admin/AccountsTable";

import { uploadCSV } from "../../../store/admin/actions";
import { isLoading, createdAccounts } from "../../../store/admin/selectors";

import "../Admin.css";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Heading, Text } from "../../../components";
import { Divider } from "../../../components/common/Divider";

const useStyles = makeStyles({
  textFields: {
    marginLeft: 20,
  },
});

const Admin = () => {
  const [dummies, setDummies] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [uploadBulk, setUploadBulk] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const accounts = useSelector(createdAccounts);
  const classes = useStyles();

  const uploadFile = () => {
    dispatch(uploadCSV(selectedFile, dummies, domain));
  };

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div>
      <Heading variant="h1">Accounts</Heading>
      <Divider />
      <Text
        style={{ fontWeight: "bold", color: "#A8A7B4", marginBottom: "40px" }}
      >
        {accounts.length} accounts
      </Text>

      <Card>
        <div style={{ display: "flex" }}>
          <Button onClick={() => setUploadBulk(!uploadBulk)}>
            Upload accounts
          </Button>
          {uploadBulk && (
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 50,
                }}
              >
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: 20 }}>Select CSV file</label>
                  <input type="file" name="file" onChange={fileSelectHandler} />
                  {isFilePicked ? (
                    <div>
                      <span>Filename: {selectedFile.name}</span>
                      <span style={{ marginLeft: 10 }}>
                        Last Modified Date:{" "}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <span>Select a file to show details</span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", marginTop: 10, marginLeft: 30 }}>
                <TextField
                  variant="filled"
                  name="dummies"
                  label="# of Backups"
                  type="number"
                  fullWidth
                  size="small"
                  margin="dense"
                  value={dummies}
                  classes={{ root: classes.textFields }}
                  onChange={(e) => setDummies(e.target.value)}
                />
                <TextField
                  variant="filled"
                  name="domain"
                  label="Backup Domain"
                  type="text"
                  fullWidth
                  size="small"
                  margin="dense"
                  value={domain}
                  classes={{ root: classes.textFields }}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <div style={{ marginLeft: 30, marginTop: 15 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={uploadFile}
                    disabled={!isFilePicked}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              {domain && `backup0@${domain}.com`}
            </div>
          )}
          {accounts && (
            <CSVLink
              data={accounts}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button variant="secondary">Download CSV</Button>
            </CSVLink>
          )}
        </div>

        {accounts && <AccountsTable accounts={accounts} />}
      </Card>
    </div>
  );
};

export default Admin;
