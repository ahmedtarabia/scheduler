import React, { Fragment } from "react";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";
import Status from "./Status.jsx";
import Confirm from "./Confirm.jsx";
import useVisualMode from "../../hooks/useVisualMode.jsx";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview && props.interview.interviewer ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => console.log(err));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETE);
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((err) => console.log(err));
  }

  function confirm(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(CONFIRM);
  }

  return (
    <Fragment>
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={deleteInterview} />
      )}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </Fragment>
  );
}
