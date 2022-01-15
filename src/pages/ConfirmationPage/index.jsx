import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getConfirmation } from "../../store/user/selectors";
import { confirmAccount } from "../../store/user/actions";

import { Spinner } from "../../components";

import "./styles.css";

const StyledContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  height: 250px;
  width: 400px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ConfirmationPage = () => {
  const token = useParams().token;
  const confirmation = useSelector(getConfirmation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(confirmAccount(token));
  }, [token, dispatch]);

  return (
    <div className='page'>
      <StyledContainer>
        {!confirmation ? (
          <>
            <h2>We are confirming your account</h2>
            <Spinner />
          </>
        ) : (
          <>
            <h2>Account Confirmed!</h2>
            <p style={{ marginBottom: 15, paddingBottom: 0, marginTop: 0 }}>
              Hello {confirmation.fullName}. Your access code is:
            </p>
            <div
              style={{
                border: "1px solid black",
                borderRadius: 16,
                paddingRight: 20,
                paddingLeft: 20,
              }}
            >
              <h2 style={{ marginTop: 20 }}>{confirmation.accessCode}</h2>
            </div>
            <p>
              Remember to write it down. You will need this to log into the
              event
            </p>
          </>
        )}
      </StyledContainer>
    </div>
  );
};

export default ConfirmationPage;
