import React, { useState } from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { ReactComponent as ChevronDown } from "../Icons/ChevronDown.svg";

const variants = {
  primary: {
    backgroundColor: "primary",
  },
  secondary: {
    border: "solid 2px",
    borderColor: "primary",
    color: "primary",
  },
  muted: {
    border: "solid 1px",
    borderColor: "grey200",
    color: "grey400",
    backgroundColor: "grey50",
    height: "32px",
    padding: "0px",
    fontWeight: "regular",
    minWidth: "0px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
};

const DropDownContainer = styled.div`
  padding: 8px;
  border-radius: 6px;
  height: 24px;
  min-width: 144px;
  color: ${(p) => p.theme.colors.white};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes[2]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;

  ${variant({ variants })}
`;

const Main = styled.div`
  display: flex;
  max-width: 152px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
`;

const ListContainer = styled.div`
  position: relative;
  display: ${(p) => (p.isOpen ? "inherit" : "none")};
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  min-width: 160px;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  font-weight: ${(p) => p.theme.fontWeights.regular};
  font-size: ${(p) => p.theme.fontSizes[2]};
  box-sizing: border-box;
  color: #3faffa;
  position: absolute;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
`;

export const Select = ({ children, variant = "primary", ...props }) => {
  const [open, setOpen] = useState(false);

  const onSelectClick = (handler) => {
    handler();
    setOpen(false);
  };
  return (
    <Main>
      <DropDownContainer variant={variant} onClick={() => setOpen(!open)}>
        {children}
        <ChevronDown style={{ height: 6, width: 12, marginLeft: 15 }} />
      </DropDownContainer>
      <ListContainer isOpen={open}>
        <DropDownList>
          {props.options.map((opt) => (
            <ListItem onClick={() => onSelectClick(opt.handler)}>
              {opt.label}
            </ListItem>
          ))}
        </DropDownList>
      </ListContainer>
    </Main>
  );
};
