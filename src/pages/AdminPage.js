import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAdminPermission } from "../store/user/selectors";

const AdminPage = () => {
  const userCredentials = useSelector(getAdminPermission);
  const history = useHistory();

  useEffect(() => {
    if (!userCredentials.admin) {
      history.push("/admin");
    }
  }, [history, userCredentials]);

  return <h1>Admin</h1>;
};

export default AdminPage;
