import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import AccountsTable from "../../../components/Admin/AccountsTable";

import { createdAccounts } from "../../../store/admin/selectors";

import "../Admin.css";

import { Button, Card, Heading, Text } from "../../../components";
import { Divider } from "../../../components/common/Divider";
import { UploadAccountsModal } from "../../../components/Admin/AccountsTable/UploadAccountsModal";
import { ReactComponent as Upload } from "../../../components/common/Icons/Upload.svg";
import { ReactComponent as Download } from "../../../components/common/Icons/Download.svg";

import "@reach/dialog/styles.css";

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setModalOpen(!isModalOpen)} icon={Upload}>
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
              <Button variant="secondary" icon={Download}>
                Download CSV
              </Button>
            </CSVLink>
          )}
        </div>

        {accounts && <AccountsTable accounts={accounts} />}
      </Card>
    </div>
  );
};

export default Admin;
