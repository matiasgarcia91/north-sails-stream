import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getSystemSettings } from "../../../store/admin/selectors";

import "../Admin.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textFields: {
    marginLeft: 20,
  },
});

const SystemSettings = () => {
  const settings = useSelector(getSystemSettings);
  const [livechat, setLivechat] = useState(settings.livechat);
  const [streamUrl, setStreamUrl] = useState(settings.streamUrl);
  const [apiUrl, setApiUrl] = useState(settings.apiUrl);
  const classes = useStyles();
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          marginLeft: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <TextField
            variant='filled'
            name='apiUrl'
            label='API url'
            type='text'
            fullWidth
            margin='dense'
            value={apiUrl}
            classes={{ root: classes.textFields }}
            onChange={e => setApiUrl(e.target.value)}
          />
          <div style={{ marginLeft: 30, marginTop: 15 }}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => console.log("update settings")}
            >
              Update
            </Button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            variant='filled'
            name='livechat'
            label='Livechat Id'
            type='number'
            fullWidth
            margin='dense'
            value={livechat}
            classes={{ root: classes.textFields }}
            onChange={e => setLivechat(e.target.value)}
          />
          <div style={{ marginLeft: 30, marginTop: 15 }}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => console.log("update settings")}
            >
              Update
            </Button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            variant='filled'
            name='streamUrl'
            label='Stream Vimeo Id'
            type='text'
            fullWidth
            margin='dense'
            value={streamUrl}
            classes={{ root: classes.textFields }}
            onChange={e => setStreamUrl(e.target.value)}
          />
          <div style={{ marginLeft: 30, marginTop: 15 }}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => console.log("update settings")}
            >
              Update
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default SystemSettings;
