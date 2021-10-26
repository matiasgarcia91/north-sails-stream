import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Select } from "../..";
import { getAdminLoadingState } from "../../../store/admin/selectors";
import { ReactComponent as Save } from "../../common/Icons/Save.svg";

export const NewRow = ({ Row, Cell, columns }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  // type "admin" | "user"

  const isLoading = useSelector(getAdminLoadingState);

  const options = [
    { label: "Admin", handler: () => setRole("admin") },
    { label: "User", handler: () => setRole("user") },
  ];

  const submit = ({ name, email, role }) => {
    const newUser = { name, email, admin: role === "admin" };
    console.log(newUser);
  };

  return (
    <Row>
      <Cell />
      {columns.map((column) => {
        const getCellContent = (col) => {
          switch (col.accessor) {
            case "fullName":
              return (
                <Input
                  style={{ maxWidth: "150px" }}
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              );
            case "email":
              return (
                <Input
                  style={{ maxWidth: "150px" }}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              );
            case "admin":
              return (
                <Select options={options} variant="muted" value={role}>
                  {role}
                </Select>
              );
            case "actions":
              return (
                <div style={{ display: "flex" }}>
                  <Button variant="unstyled" onClick={submit}>
                    <Save
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "#00e8af",
                      }}
                    />
                  </Button>
                </div>
              );
            default:
              return;
          }
        };

        return <Cell>{getCellContent(column)}</Cell>;
      })}
    </Row>
  );
};
