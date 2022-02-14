import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AccountsTab from "./Tabs/AccountsTab";
import SystemSettingsTab from "./Tabs/SystemSettings";

import { getAdminOnline } from "../../store/admin/selectors";
import { fetchUserAccounts } from "../../store/admin/actions";
import { AdminLayout } from "../../components";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const online = useSelector(getAdminOnline);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAccounts());
    if (!online) history.push("/admin/login");
  }, [online, history, dispatch]);

  const tabToRender = () => {
    switch (activeTab) {
      case 0:
        return <AccountsTab />;
      case 1:
        return <SystemSettingsTab />;
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
