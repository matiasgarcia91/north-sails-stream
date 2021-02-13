import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountsTable from "./AccountsTable";

import { uploadCSV } from "../../store/admin/actions";
import { isLoading, createdAccounts } from "../../store/admin/selectors";

import "./Admin.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  button: {
    color: "rgba(0,0,0,1)",
    backgroundColor: "rgba(255,255,255,1)",
    "&:hover": {
      backgroundColor: "#c4c4c4",
    },
  },
  textFields: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
    marginBottom: 2,
    marginTop: 2,
  },
  label: {
    color: "white",
  },
  black: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
  },
});

const Admin = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(isLoading);
  const accounts = useSelector(createdAccounts);

  const classes = useStyles();

  // const submitLogin = e => {
  //   e.preventDefault();
  //   if (!email || !password) return;
  //   dispatch(login(email, password, history));
  //   console.log(email, password);
  // };

  const uploadFile = () => {
    // console.log("not really");
    dispatch(uploadCSV(selectedFile, 25, "ronald"));
  };

  const fileSelectHandler = event => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  if (loading) {
    return (
      <div className='admin'>
        <h1>🚀🚀🚀🚀 Oliverg's User Management Hub 🚀🚀🚀🚀</h1>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='admin'>
      <h1>🚀🚀🚀🚀 Oliverg's User Management Hub 🚀🚀🚀🚀</h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {accounts ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 50,
                width: "100%",
              }}
            >
              <h2>Accounts Created! 🚀🚀</h2>
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
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 50,
              }}
            >
              <div>
                <label style={{ marginRight: 20 }}>Select CSV file</label>
                <input type='file' name='file' onChange={fileSelectHandler} />
                {/* <Button variant='contained' color='primary' type='submit'>
              Choose
            </Button> */}
              </div>
              <div>
                {isFilePicked ? (
                  <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                      lastModifiedDate:{" "}
                      {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
              </div>
            </div>
            <div>
              <Button
                variant='contained'
                color='primary'
                onClick={uploadFile}
                disabled={!isFilePicked}
              >
                Submit
              </Button>
            </div>
          </>
        )}
        {/* <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onSubmit={submitLogin}
        >
          <div className='form-fields'>
            <TextField
              error={!!error}
              variant='filled'
              name='email'
              label='Email'
              type='email'
              fullWidth
              size='small'
              margin='dense'
              value={email}
              classes={{ root: classes.textFields }}
              InputProps={{
                classes: { input: classes.black },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-fields'>
            <TextField
              error={!!error}
              variant='filled'
              name='password'
              label='Password'
              type='password'
              margin='dense'
              size='small'
              classes={{ root: classes.textFields }}
              InputProps={{
                classes: { input: classes.black },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              fullWidth
              helperText={error}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-button'>
            <Button
              variant='contained'
              classes={{ contained: classes.button, root: classes.root }}
              type='submit'
            >
              Login
            </Button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default Admin;
