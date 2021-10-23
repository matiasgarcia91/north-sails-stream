import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AccountsTab from "./Tabs/AccountsTab";
import SystemSettingsTab from "./Tabs/SystemSettings";
import ResetTab from "./Tabs/ResetTab";

import { getAdminOnline } from "../../store/admin/selectors";
import { fetchUserAccounts } from "../../store/admin/actions";
import { AdminLayout, Button, Card, Heading } from "../../components";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const online = useSelector(getAdminOnline);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAccounts());
    if (!online) history.push("/admin/login");
  }, [online, history]);

  // const TabBar = () => (
  //   <div className="tab-bar">
  //     <div className="tab-bar-cell">
  //       <Button onClick={() => setActiveTab(0)}>Accounts</Button>
  //     </div>
  //     <div
  //       className="tab-bar-cell"
  //       style={{
  //         borderLeft: "2px solid lightblue",
  //         borderRight: "2px solid lightblue",
  //       }}
  //     >
  //       <Button variant="outline">System Settings</Button>
  //     </div>
  //     <div className="tab-bar-cell">
  //       <Button onClick={() => setActiveTab(2)}>Reset Database</Button>
  //     </div>
  //   </div>
  // );

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
    <AdminLayout setActiveTab={setActiveTab} activeTab={activeTab}>
      {tabToRender()}
    </AdminLayout>
  );
};

export default Admin;
