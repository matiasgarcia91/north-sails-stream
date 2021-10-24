import styled from "styled-components";

import { Card } from "../../../../components";
import EventDetailsForm from "./EventDetailsForm";

import "../../Admin.css";

const SystemSettings = () => {
  const StyledDiv = styled.div`
    display: flex;
  `;

  return (
    <StyledDiv style={{ justifyContent: "center" }}>
      <StyledDiv style={{ flexDirection: "column", marginRight: 40 }}>
        <Card style={{ marginBottom: 40 }}>Hola</Card>
        <Card>Hey</Card>
      </StyledDiv>

      <EventDetailsForm />
    </StyledDiv>
  );
};
export default SystemSettings;
