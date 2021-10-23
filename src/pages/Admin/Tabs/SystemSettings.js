import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getSystemSettings } from "../../../store/admin/selectors";

import { Heading } from "../../../components/common/Heading";
import { Card } from "../../../components/common/Card";

import "../Admin.css";

import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "../../../components/common/Divider";
import { Button } from "../../../components/common/Button";

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
      <Heading variant="h1">Settings</Heading>
      <Divider />

      <Card>
        <Heading
          variant="h2"
          style={{ textAlign: "left", marginBottom: "32px" }}
        >
          System
        </Heading>
        <TextField
          variant="filled"
          name="apiUrl"
          label="API url"
          type="text"
          fullWidth
          margin="dense"
          value={apiUrl}
          classes={{ root: classes.textFields }}
          onChange={(e) => setApiUrl(e.target.value)}
        />
        <TextField
          variant="filled"
          name="livechat"
          label="Livechat Id"
          type="number"
          fullWidth
          margin="dense"
          value={livechat}
          classes={{ root: classes.textFields }}
          onChange={(e) => setLivechat(e.target.value)}
        />

        <TextField
          variant="filled"
          name="streamUrl"
          label="Stream Vimeo Id"
          type="text"
          fullWidth
          margin="dense"
          value={streamUrl}
          classes={{ root: classes.textFields }}
          onChange={(e) => setStreamUrl(e.target.value)}
        />

        <Button>Update</Button>
      </Card>
    </div>
  );
};
export default SystemSettings;
