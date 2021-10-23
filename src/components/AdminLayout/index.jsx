import React from "react";
import styled from "styled-components";
import { Navigation } from "./Navigation";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: ${(p) => p.theme.colors.grey50};
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  padding-top: 96px;
  max-width: ${(p) => p.theme.sizes.maxWidth};
  margin: 0 auto;
`;

export const AdminLayout = ({ setActiveTab, activeTab, children }) => {
  return (
    <Container>
      <Navigation setActiveTab={setActiveTab} activeTab={activeTab} />
      <Content>{children}</Content>
    </Container>
  );
};
