import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: ${(p) => p.theme.colors.grey50};
`;

export const AdminLayout = ({ children }) => {
  return <Container>{children}</Container>;
};
