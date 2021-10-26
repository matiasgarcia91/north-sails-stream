import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import AccountsTable from "../../../components/Admin/AccountsTable";

import { createdAccounts } from "../../../store/admin/selectors";

import "../Admin.css";

import { Button, Card, Heading, Text } from "../../../components";
import { Divider } from "../../../components/common/Divider";
import Dialog from "@reach/dialog";
import { UploadAccountsModal } from "../../../components/Admin/AccountsTable/UploadAccountsModal";

const Admin = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const accounts = useSelector(createdAccounts);

  return (
    <div>
      <Heading variant="h1">Accounts</Heading>
      <Divider />
      <Text
        style={{ fontWeight: "bold", color: "#A8A7B4", marginBottom: "40px" }}
      >
        {accounts.length} accounts
      </Text>

      <Card>
        <div style={{ display: "flex" }}>
          <Button onClick={() => setModalOpen(!isModalOpen)}>
            Upload accounts
          </Button>

          <UploadAccountsModal
            isOpen={isModalOpen}
            closeModal={() => setModalOpen(false)}
          />

          {accounts && (
            <CSVLink
              data={accounts}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button variant="secondary">Download CSV</Button>
            </CSVLink>
          )}
        </div>

        {accounts && <AccountsTable accounts={accounts} />}
      </Card>
    </div>
  );
};

export default Admin;
