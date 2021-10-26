import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Heading, Button } from "../..";
import { uploadCSV } from "../../../store/admin/actions";
import { ReactComponent as ChevronDown } from "../../common/Icons/ChevronDown.svg";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadAccountsModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [dummies, setDummies] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const uploadFile = () => {
    dispatch(uploadCSV(selectedFile, dummies, domain));
  };

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <StyledDiv>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        onClick={closeModal}
      >
        <ChevronDown style={{ width: 10, height: 10 }} />
      </div>
      <Heading variant={"h2"}>Email</Heading>
      <div>
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 50,
            }}
          >
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: 20 }}>Select CSV file</label>
              <input type="file" name="file" onChange={fileSelectHandler} />
              {isFilePicked ? (
                <div>
                  <span>Filename: {selectedFile.name}</span>
                  <span style={{ marginLeft: 10 }}>
                    Last Modified Date:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <span>Select a file to show details</span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10, marginLeft: 30 }}>
            <TextField
              variant="filled"
              name="dummies"
              label="# of Backups"
              type="number"
              fullWidth
              size="small"
              margin="dense"
              value={dummies}
              onChange={(e) => setDummies(e.target.value)}
            />
            <TextField
              variant="filled"
              name="domain"
              label="Backup Domain"
              type="text"
              fullWidth
              size="small"
              margin="dense"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <div style={{ marginLeft: 30, marginTop: 15 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={uploadFile}
                disabled={!isFilePicked}
              >
                Submit
              </Button>
            </div>
          </div>
          {domain && `backup0@${domain}.com`}
        </div>
      </div>
    </StyledDiv>
  );
};
