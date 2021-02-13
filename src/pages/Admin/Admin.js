import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountsTab from "./Tabs/AccountsTab";
import ExtraSettingsTab from "./Tabs/ExtraSettings";
import ResetTab from "./Tabs/ResetTab";

import { uploadCSV } from "../../store/admin/actions";
import { isLoading, createdAccounts } from "../../store/admin/selectors";

import "./Admin.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textFields: {
    marginLeft: 20,
  },
});

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const accounts = useSelector(createdAccounts);
  const classes = useStyles();

  const TabBar = () => (
    <div className='tab-bar'>
      <div className='tab-bar-cell'>
        <Button
          color='primary'
          variant={activeTab === 0 && "contained"}
          onClick={() => setActiveTab(0)}
        >
          Accounts
        </Button>
      </div>
      <div
        className='tab-bar-cell'
        style={{
          borderLeft: "2px solid lightblue",
          borderRight: "2px solid lightblue",
        }}
      >
        <Button
          color='primary'
          onClick={() => setActiveTab(1)}
          variant={activeTab === 1 && "contained"}
        >
          Extra Setting
        </Button>
      </div>
      <div className='tab-bar-cell'>
        <Button
          color='primary'
          onClick={() => setActiveTab(2)}
          variant={activeTab === 2 && "contained"}
        >
          Reset Database
        </Button>
      </div>
    </div>
  );

  const tabToRender = () => {
    switch (activeTab) {
      case 0:
        return <AccountsTab />;
      case 1:
        return <ExtraSettingsTab />;
      case 2:
        return <ResetTab />;
      default:
        return <AccountsTab />;
    }
  };

  return (
    <div className='admin'>
      <h1>🚀🚀🚀🚀 Oliverg's User Management Hub 🚀🚀🚀🚀</h1>
      <TabBar />
      <div style={{ marginTop: 40 }}>{tabToRender()}</div>
    </div>
  );
};

export default Admin;
