import styled from "styled-components";
import { ReactComponent as Accounts } from "../../common/Icons/Accounts.svg";
import { ReactComponent as Settings } from "../../common/Icons/Settings.svg";
import oliPng from "../../../images/oliflows.png";

const Nav = styled.div`
  width: 80px;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin-bottom: 14px;

  background-color: ${({ activeTab, theme }) =>
    activeTab ? theme.colors.green100 : theme.colors.transparent};

  :last-child {
    margin-bottom: 0px;
  }

  svg {
    width: 24px;
  }
`;

export const Navigation = ({ setActiveTab, activeTab }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: "20px",
        left: "24px",
        alignSelf: "flex-start",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(140deg, rgba(0,232,175,1) 35%, rgba(0,177,254,1) 100%)",
          height: "80px",
          width: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          marginBottom: "24px",
        }}
      >
        <Logo />
      </div>

      <Nav>
        <NavButton onClick={() => setActiveTab(0)} activeTab={activeTab === 0}>
          <Accounts />
        </NavButton>

        <NavButton onClick={() => setActiveTab(1)} activeTab={activeTab === 1}>
          <Settings />
        </NavButton>
      </Nav>
    </div>
  );
};
