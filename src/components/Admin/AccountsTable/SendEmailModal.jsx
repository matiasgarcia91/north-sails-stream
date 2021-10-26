import { useState } from "react";
import styled from "styled-components";

import { Checkbox, Heading, Input, Textarea, Text, Button } from "../..";
import { ReactComponent as ChevronDown } from "../../common/Icons/ChevronDown.svg";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
}) => {
  const [toAll, setToAll] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const buttonDisabled = !subject || !content;
  return (
    <StyledDiv>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        onClick={closeModal}
      >
        <ChevronDown style={{ width: 10, height: 10 }} />
      </div>
      <Heading variant={"h2"}>Email</Heading>
      <div
        style={{
          width: "100%",
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
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
            Selected Accounts: {selected.length}
          </Heading>
        </div>
      </div>
      <div style={{ width: "100%", padding: 10 }}>
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
          Email will include under this message the access code
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
    </StyledDiv>
  );
};
