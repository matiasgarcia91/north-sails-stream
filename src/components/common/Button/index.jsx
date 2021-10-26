import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { Spinner } from "../../../components";

const variants = {
  primary: {
    backgroundColor: "primary",
  },
  secondary: {
    border: "solid 2px",
    borderColor: "primary",
    color: "primary",
  },
  warning: {
    backgroundColor: "secondary",
  },
  disabled: {
    backgroundColor: "grey200",
    color: "grey400",
  },
  unstyled: {
    color: "grey800",
    padding: 0,
    minWidth: 0,
  },
};

const StyledButton = styled.button`
  padding: 8px;
  min-width: 160px;
  border-radius: 6px;
  height: 40px;
  color: ${p => p.theme.colors.white};
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes[2]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${variant({ variants })}
`;

export const Button = ({ children, variant = "primary", ...props }) => {
  const spinnerColor = variant === "secondary" ? "#00e8af" : "white";
  const Icon = props.icon;
  return (
    <StyledButton variant={variant} {...props}>
      {props.loading ? (
        <Spinner color={spinnerColor} size={16} style={{ marginBottom: 3 }} />
      ) : (
        <>
          {children}{" "}
          {Icon && (
            <Icon
              style={{
                marginLeft: 5,
                height: 20,
                width: 20,
                color: spinnerColor,
              }}
            />
          )}
        </>
      )}
    </StyledButton>
  );
};
