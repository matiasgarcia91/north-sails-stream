import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getAdminUser } from "../../store/admin/selectors";
import { Navigation } from "./Navigation";
import { Text } from "../Text";
import { ReactComponent as ChevronDown } from "../Icons/ChevronDown.svg";

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
  display: flex;
  flex-direction: column;
`;

const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grey100};
  margin-right: 8px;
`;

const UserDropdown = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 80px;
  right: 12px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const DropDownButton = styled.button`
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey100};
  }
`;

export const AdminLayout = ({ setActiveTab, activeTab, children }) => {
  const user = useSelector(getAdminUser);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Container>
      <Navigation setActiveTab={setActiveTab} activeTab={activeTab} />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <button
          style={{
            alignSelf: "end",
            margin: "20px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <ProfilePic />
          <Text style={{ fontWeight: 700, marginRight: "8px" }}>
            {user?.fullName}
          </Text>
          <ChevronDown
            height="6px"
            width="12px"
            style={{
              transform: showDropdown && "rotate(180deg)",
              transition: "transform 0.3s",
            }}
          />
        </button>
        {showDropdown && <UserDropdown />}

        <Content>{children}</Content>
      </div>
    </Container>
  );
};
