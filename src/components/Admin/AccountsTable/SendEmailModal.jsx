import { useState } from "react";

import { Checkbox, Heading, Input, Textarea, Text, Button } from "../..";
import { ReactComponent as Close } from "../../common/Icons/Close.svg";
import { Modal } from "../../common/Modal";

const placeholderText = `Hello!

Thanks for being a part of the North Sails Livestream. You can find your access code down below. We hope you enjoy the stream.

Kind regards,
North Team
`;

export const SendEmailModal = ({
  selected,
  closeModal,
  sendEmail,
  isLoading,
  totalRows,
  isOpen,
}) => {
  const [toAll, setToAll] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const buttonDisabled =
    !subject || !content || (selected.length === 0 && !toAll);

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
        <Heading variant={"h2"}>Send e-mail</Heading>
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
          <Heading variant={"h4"} style={{ marginBottom: 10 }}>
            Send to:
          </Heading>
          <Checkbox
            label="All"
            onChange={() => setToAll(true)}
            style={{ width: 18, height: 18, marginLeft: 45 }}
            checked={toAll}
          />
          <Checkbox
            label={`Selected`}
            onChange={() => setToAll(false)}
            style={{ width: 18, height: 18 }}
            checked={!toAll}
          />
        </div>

        <div>
          <Heading variant={"h4"} style={{ marginBottom: 30 }}>
            Selected Accounts: {toAll ? totalRows : selected.length}
          </Heading>
        </div>
      </div>

      <div style={{ width: "100%", marginBottom: "32px" }}>
        <Input
          label="Subject"
          placeholder="Your access code for North Sails Livestream"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div style={{ height: 20 }} />
        <Textarea
          label="Message"
          placeholder={placeholderText}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div style={{ height: 30 }} />
        <Text style={{ fontSize: 12, fontStyle: "italics" }}>
          Email will include the access code under this message.
        </Text>
      </div>

      <Button
        style={{ marginTop: 20 }}
        disabled={buttonDisabled}
        variant={buttonDisabled ? "disabled" : "primary"}
        loading={isLoading}
        onClick={() => sendEmail({ subject, content, all: toAll })}
      >
        Send
      </Button>
    </Modal>
  );
};
