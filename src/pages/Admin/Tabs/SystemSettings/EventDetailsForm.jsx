import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  getAdminEvent,
  getAdminLoadingState,
} from "../../../../store/admin/selectors";
import { updateEventSettings } from "../../../../store/admin/actions";

import { Card, Heading, Input, Checkbox, Button } from "../../../../components";

const FieldSeparator = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const EventDetailsForm = () => {
  const [eventForm, setEventForm] = useState({});
  const dispatch = useDispatch();

  const event = useSelector(getAdminEvent);
  const loadingState = useSelector(getAdminLoadingState);

  useEffect(() => {
    if (event) setEventForm({ ...event });
  }, [event]);

  const onFormChange = e => {
    const isCheckbox = e.target.type === "checkbox";
    setEventForm({
      ...eventForm,
      [e.target.name]: isCheckbox ? !eventForm[e.target.name] : e.target.value,
    });
  };

  const onEventUpdate = () => {
    dispatch(updateEventSettings(eventForm));
  };

  return (
    <Card
      style={{ minWidth: 290, minHeight: 420, display: "flex", maxWidth: 300 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Heading
          variant='h3'
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          Event Settings
        </Heading>
        {loadingState.eventForm ? (
          <div>SPINNNEERRRR</div>
        ) : (
          <>
            <FieldSeparator />
            <Input
              onChange={onFormChange}
              label='Event name'
              value={eventForm.name}
              name='name'
            />
            <FieldSeparator />
            <Input
              onChange={onFormChange}
              label='Livechat ID'
              value={eventForm.livechatId}
              name='livechatId'
            />
            <FieldSeparator />
            <Input
              onChange={onFormChange}
              label='Stream Vimeo ID'
              value={eventForm.streamUrl}
              name='streamUrl'
            />
            <FieldSeparator />
            <Checkbox
              label='Watermark active'
              checked={eventForm.watermark}
              onChange={onFormChange}
              name='watermark'
            />
            <FieldSeparator />
            <Button variant='primary' onClick={onEventUpdate}>
              Update
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default EventDetailsForm;
