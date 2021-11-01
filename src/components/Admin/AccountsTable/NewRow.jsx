import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Select, Spinner } from "../..";
import { addUser } from "../../../store/admin/actions";
import { getAdminLoadingState, getError } from "../../../store/admin/selectors";
import { ReactComponent as Save } from "../../common/Icons/Save.svg";

export const NewRow = ({ Row, Cell, columns, setAddingRow }) => {
  const dispatch = useDispatch();
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
    const newUser = { fullName: name, email, admin: role === "admin" };
    dispatch(addUser(newUser));

    // setAddingRow(false);
  };

  return (
    <Row>
      <Cell>
        <input type="checkbox" disabled />
      </Cell>
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
                  type="email"
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
                  <Button
                    variant="unstyled"
                    onClick={() => submit({ name, email, role })}
                  >
                    {isLoading.addUser ? (
                      <Spinner
                        style={{
                          height: "20px",
                          width: "20px",
                          color: "#00e8af",
                        }}
                      />
                    ) : (
                      <Save
                        style={{
                          height: "20px",
                          width: "20px",
                          color: "#00e8af",
                        }}
                      />
                    )}
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
