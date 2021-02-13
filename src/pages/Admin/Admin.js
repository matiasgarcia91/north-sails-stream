import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import AccountsTab from "./Tabs/AccountsTab";
import SystemSettingsTab from "./Tabs/SystemSettings";
import ResetTab from "./Tabs/ResetTab";

import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      <h1>🚀🚀🚀🚀 Oliverg's User Management Hub 🚀🚀🚀🚀</h1>
      <TabBar />
      <div style={{ marginTop: 40 }}>{tabToRender()}</div>
    </div>
  );
};

export default Admin;
