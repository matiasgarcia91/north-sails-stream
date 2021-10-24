import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountsTable from "../../../components/Admin/AccountsTable";

import { uploadCSV } from "../../../store/admin/actions";
import { isLoading, createdAccounts } from "../../../store/admin/selectors";

import "../Admin.css";

import { makeStyles } from "@material-ui/core/styles";
import { Card } from "../../../components";

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
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setUploadBulk(!uploadBulk)}
      >
        Input Bulk
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
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 50,
              width: "100%",
            }}
          >
            <div style={{ display: "flex", marginBottom: 20 }}>
              <label style={{ paddingRight: 15, paddingTop: 7 }}>
                Download CSV
              </label>

              <div>
                <CSVLink className="download" data={accounts}>
                  Download
                </CSVLink>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AccountsTable accounts={accounts} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default Admin;
