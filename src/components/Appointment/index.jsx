import React, { Fragment } from "react";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";
import Status from "./Status.jsx";
import Confirm from "./Confirm.jsx";
import Error from "./Error.jsx";
import useVisualMode from "../../hooks/useVisualMode.jsx";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview && props.interview.interviewer ? SHOW : EMPTY
  );

  function save(name, interviewer, isNew) {
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };
    console.log("THIS IS ISNEWWWW", isNew);
    transition(SAVING);
    props
      .bookInterview(props.id, interview, isNew)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
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
          onEdit={edit}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={deleteInterview} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          isNew={false}
        />
      )}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onCancel={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not update appointment" onCancel={() => back()} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          isNew={true}
        />
      )}
    </Fragment>
  );
}
