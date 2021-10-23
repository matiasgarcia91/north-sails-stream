import styled from "styled-components";
import { ReactComponent as Logo } from "../Icons/Logo.svg";
import { ReactComponent as Accounts } from "../Icons/Accounts.svg";
import { ReactComponent as Settings } from "../Icons/Settings.svg";

const SideBar = styled.div`
  height: 100%;
  width: 80px;
  background-color: ${(p) => p.theme.colors.white};
`;

const LogoCont = styled.div`
  height: 80px;
  width: 80px;
  background-color: ${(p) => p.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
  }
`;

const NavButton = styled.button`
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
  }
`;

export const Navigation = () => {
  return (
    <SideBar>
      <LogoCont>
        <Logo />
      </LogoCont>
      <NavButton>
        <Accounts />
      </NavButton>
      <NavButton>
        <Settings />
      </NavButton>
    </SideBar>
  );
};
