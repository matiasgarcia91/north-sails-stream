import styled from "styled-components";
import { ReactComponent as Accounts } from "../Icons/Accounts.svg";
import { ReactComponent as Settings } from "../Icons/Settings.svg";
import oliPng from "../../images/oliflows.png";

const SideBar = styled.div`
  height: 100%;
  width: 80px;
  background-color: ${(p) => p.theme.colors.white};
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${oliPng});
  background-position: center;
  background-size: contain;
  filter: invert(100%);
`;

const NavButton = styled.button`
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ activeTab, theme }) =>
    activeTab ? theme.colors.grey100 : theme.colors.transparent};

  svg {
    width: 24px;
  }
`;

export const Navigation = ({ setActiveTab, activeTab }) => {
  return (
    <SideBar>
      <div
        style={{
          background:
            "linear-gradient(140deg, rgba(0,232,175,1) 35%, rgba(0,177,254,1) 100%)",
          height: "80px",
          width: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
      </div>

      <NavButton onClick={() => setActiveTab(0)} activeTab={activeTab === 0}>
        <Accounts />
      </NavButton>

      <NavButton onClick={() => setActiveTab(1)} activeTab={activeTab === 1}>
        <Settings />
      </NavButton>
    </SideBar>
  );
};
