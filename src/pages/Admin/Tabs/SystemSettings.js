import styled from "styled-components";

import { Button, Card, Heading, Label } from "../../../components";
import EventDetailsForm from "../../../components/Admin/EventDetailsForm";
import ResetDatabase from "../../../components/Admin/ResetDatabase";

import "../Admin.css";

const SystemSettings = () => {
  const StyledDiv = styled.div`
    display: flex;
  `;

  return (
    <StyledDiv style={{ justifyContent: "center" }}>
      <StyledDiv style={{ flexDirection: "column", marginRight: 40 }}>
        <Card
          style={{
            marginBottom: 40,
            width: 700,
            height: 450,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Email template form, coming soon...
        </Card>
        <Card
          style={{
            width: 700,
          }}
        >
          <ResetDatabase />
        </Card>
      </StyledDiv>

      <EventDetailsForm />
    </StyledDiv>
  );
};
export default SystemSettings;
