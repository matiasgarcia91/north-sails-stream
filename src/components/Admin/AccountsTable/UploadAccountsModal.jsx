import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Heading, Button, Text, Input, Checkbox } from "../..";
import { uploadCSV } from "../../../store/admin/actions";
import { Modal } from "../../common/Modal";
import { ReactComponent as Close } from "../../common/Icons/Close.svg";
import styled from "styled-components";

const Label = styled.label`
  margin-bottom: 12px;
  font-weight: 700;
  color: ${(p) => p.theme.colors.grey400};
  font-size: 16px;
`;

const FileInput = styled.label`
  border: none;
  height: 32px;
  width: 100px;
  background-color: ${({ theme }) => theme.colors.grey50};
  color: ${({ theme }) => theme.colors.grey400};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey400};
  padding-left: 12px;
  padding-right: 12px;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const UploadAccountsModal = ({ closeModal, isOpen }) => {
  const dispatch = useDispatch();
  const [dummies, setDummies] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [createBackups, setCreateBackups] = useState(false);

  const uploadFile = () => {
    dispatch(uploadCSV(selectedFile, dummies, domain));
  };

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <Modal isOpen={isOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <Heading variant={"h2"}>Upload accounts</Heading>
        <Button onClick={closeModal} variant="unstyled">
          <Close style={{ width: "32px", height: "32px" }} />
        </Button>
      </div>
      <Text
        style={{ fontSize: "14px", color: "#A8A7B4", marginBottom: "32px" }}
      >
        Upload accounts in CSV format
      </Text>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Label style={{ marginBottom: "14px" }}>Select CSV file</Label>

        <FileInput>
          Choose file...
          <input
            type="file"
            name="file"
            onChange={fileSelectHandler}
            style={{ display: "none" }}
          />
        </FileInput>

        <div style={{ marginBottom: "14px", color: "#6B6B86" }}>
          {isFilePicked ? (
            <div>
              <div>Filename: {selectedFile.name}</div>
              <div>
                Last Modified Date:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div>Select a file to show details</div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Checkbox
          style={{ marginLeft: "0px" }}
          variant="small"
          value={createBackups}
          onChange={() => setCreateBackups(!createBackups)}
        />
        <Text style={{ marginLeft: "8px" }}>Also create backup accounts</Text>
      </div>

      {createBackups && (
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "32px",
          }}
        >
          <Input
            label="# of Backups"
            type="number"
            value={dummies}
            onChange={(e) => setDummies(e.target.value)}
            style={{ minWidth: "245px" }}
          />
          <div style={{ marginLeft: "24px" }}>
            <Input
              label="Backup Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={{ minWidth: "245px" }}
            />
            <div style={{ marginTop: "8px", color: "#6B6B86" }}>
              {domain && `Example: backup0@${domain}.com`}
            </div>
          </div>
        </div>
      )}

      <Button onClick={uploadFile} disabled={!isFilePicked}>
        Submit
      </Button>
    </Modal>
  );
};
