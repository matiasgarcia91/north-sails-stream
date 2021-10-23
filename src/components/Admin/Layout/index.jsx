import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAdminUser } from "../../../store/admin/selectors";
import { Navigation } from "./Navigation";
import { Text } from "../../common/Text";
import { ReactComponent as ChevronDown } from "../../common/Icons/ChevronDown.svg";
import { Card } from "../../common/Card";

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

const DropDownButton = styled.button`
  cursor: pointer;
  width: 100%;
  min-height: 40px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey800};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey100};
  }
`;

export const AdminLayout = ({ setActiveTab, activeTab, children }) => {
  const user = useSelector(getAdminUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

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
        {showDropdown && (
          <Card
            style={{
              position: "absolute",
              width: "150px",
              top: "72px",
              right: "24px",
              padding: "12px",
            }}
            onClick={() => dispatch({ type: "ADMIN_LOGOUT" })}
          >
            <DropDownButton>Logout</DropDownButton>
          </Card>
        )}

        <Content>{children}</Content>
      </div>
    </Container>
  );
};
