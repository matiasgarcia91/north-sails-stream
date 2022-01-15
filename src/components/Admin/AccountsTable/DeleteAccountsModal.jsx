import { useState } from "react";

import { Checkbox, Heading, Input, Textarea, Text, Button } from "../..";
import { ReactComponent as Close } from "../../common/Icons/Close.svg";
import { Modal } from "../../common/Modal";

export const DeleteAccountsModal = ({
  selected,
  closeModal,
  isLoading,
  isOpen,
  deleteAccounts,
}) => {
  const buttonDisabled = selected?.length < 1;

  return (
    <Modal isOpen={isOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <Heading variant={"h2"}>Delete accounts</Heading>
        <Button onClick={closeModal} variant="unstyled">
          <Close style={{ width: "32px", height: "32px" }} />
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <div>
          <Heading variant={"h4"} style={{ marginBottom: 30 }}>
            {selected?.length > 0
              ? `Are you sure you want to delete ${selected?.length} accounts?`
              : "No accounts selected"}
          </Heading>
        </div>
      </div>

      <Button
        style={{ marginTop: 20 }}
        disabled={buttonDisabled}
        variant={buttonDisabled ? "disabled" : "primary"}
        loading={isLoading}
        onClick={() =>
          deleteAccounts({ userIds: selected?.map((row) => row?.original?.id) })
        }
      >
        Delete
      </Button>
    </Modal>
  );
};
