import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Heading, Button } from "../..";
import { uploadCSV } from "../../../store/admin/actions";
import { Modal } from "../../common/Modal";
import { ReactComponent as Close } from "../../common/Icons/Close.svg";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadAccountsModal = ({ closeModal, isOpen }) => {
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
    <Modal isOpen={isOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <Heading variant={"h2"}>Upload accounts</Heading>
        <Button onClick={closeModal} variant='unstyled'>
          <Close style={{ width: "32px", height: "32px" }} />
        </Button>
      </div>

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
              <input type='file' name='file' onChange={fileSelectHandler} />
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
              variant='filled'
              name='dummies'
              label='# of Backups'
              type='number'
              fullWidth
              size='small'
              margin='dense'
              value={dummies}
              onChange={(e) => setDummies(e.target.value)}
            />
            <TextField
              variant='filled'
              name='domain'
              label='Backup Domain'
              type='text'
              fullWidth
              size='small'
              margin='dense'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <div>
            <Button
              onClick={uploadFile}
              disabled={!isFilePicked}
              variant={!isFilePicked ? "disabled" : "primary"}
            >
              Submit
            </Button>
          </div>
          {domain && `backup0@${domain}.com`}
        </div>
      </div>
    </Modal>
  );
};
