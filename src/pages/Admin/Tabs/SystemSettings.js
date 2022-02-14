import styled from "styled-components";

import { Card, Divider, Heading } from "../../../components";
import EventDetailsForm from "../../../components/Admin/EventDetailsForm";
import ResetDatabase from "../../../components/Admin/ResetDatabase";

import "../Admin.css";

const SystemSettings = () => {
  const StyledDiv = styled.div`
    display: flex;
  `;

  return (
    <div>
      <Heading variant='h1'>Settings</Heading>
      <Divider />

      <StyledDiv style={{ justifyContent: "space-between" }}>
        <StyledDiv style={{ flexDirection: "column", marginRight: 40 }}>
          <Card
            style={{
              marginBottom: 40,
              width: 780,
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
              width: 780,
            }}
          >
            <ResetDatabase />
          </Card>
        </StyledDiv>

        <EventDetailsForm />
      </StyledDiv>
    </div>
  );
};
export default SystemSettings;
