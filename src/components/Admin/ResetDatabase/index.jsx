import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Heading, Text, Button, Modal } from "../..";
import { ReactComponent as Close } from "../../common/Icons/Close.svg";
import { getAdminLoadingState } from "../../../store/admin/selectors";
import { resetDatabase } from "../../../store/admin/actions";

const ResetDatabase = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector(getAdminLoadingState).resetDB;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) setIsOpen(false);
  }, [loading]);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Modal isOpen={isOpen}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Heading variant='h3'>Are you sure?</Heading>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant='unstyled'
          >
            <Close style={{ width: "32px", height: "32px" }} />
          </Button>
        </div>

        <Text>
          This will delete all current users and their generated passwords.
          Deleted passwords cannot be recovered and will need to be generated
          again.
        </Text>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}
        >
          <Button
            style={{ backgroundColor: "#eb4034" }}
            loading={loading}
            onClick={() => dispatch(resetDatabase())}
          >
            I'm sure, reset!
          </Button>
        </div>
      </Modal>
      <div>
        <Heading
          variant='h3'
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 20,
          }}
        >
          Database
        </Heading>
        <Text>Delete all accounts and restore only admin accounts.</Text>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Button
          style={{ backgroundColor: "#eb4034" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ResetDatabase;
