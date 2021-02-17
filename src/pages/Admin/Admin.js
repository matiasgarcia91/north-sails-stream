import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import AccountsTab from "./Tabs/AccountsTab";
import SystemSettingsTab from "./Tabs/SystemSettings";
import ResetTab from "./Tabs/ResetTab";

import { getAdminOnline } from "../../store/admin/selectors";
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const online = useSelector(getAdminOnline);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!online) history.push("/secreto/login");
  }, [online, history]);

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
          System Settings
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
        return <SystemSettingsTab />;
      case 2:
        return <ResetTab />;
      default:
        return <AccountsTab />;
    }
  };

  return (
    <div className='admin'>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <div style={{ flex: 1 }}>
          <h1>🚀 Oliverg's Settings Hub 🚀</h1>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Button
            color='secondary'
            variant='contained'
            onClick={() => dispatch({ type: "ADMIN_LOGOUT" })}
          >
            Logout
          </Button>
        </div>
      </div>
      <TabBar />
      <div style={{ marginTop: 40 }}>{tabToRender()}</div>
    </div>
  );
};

export default Admin;
