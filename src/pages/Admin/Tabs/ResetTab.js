import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { resetDB } from "../../../store/admin/actions";
import axios from "../../../store/axios";

import "../Admin.css";

const ResetTab = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);

  const onReset = async () => {
    try {
      setLoading(true);
      setOpen(false);
      const deleted = await axios.post("/csv-upload/reset-db");
      console.log(deleted);
      setDone(true);
      setLoading(false);
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
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
        <CircularProgress />
      </div>
    );
  }

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
      <div style={{ display: "flex", marginTop: 10, marginLeft: 50 }}>
        {done ? (
          <label style={{ marginTop: 21, textDecoration: "bold" }}>
            Database Reset Successful
          </label>
        ) : (
          <>
            <label style={{ marginTop: 21, textDecoration: "bold" }}>
              Reset User table in Database
            </label>
            <div style={{ marginLeft: 30, marginTop: 15 }}>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleOpen}
              >
                Reset
              </Button>
            </div>
          </>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You are about to delete all the user database (limado). Are you
            sure? Only the admin account will remain.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autofocus>
            Disagree
          </Button>
          <Button onClick={onReset} color='secondary'>
            Yes let's delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ResetTab;
