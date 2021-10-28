import React, {Fragment} from "react";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";

import "components/Appointment/styles.scss"

export default function Appointment (props) {
  return (
    <Fragment>
    <header>{props.time}</header>
    {props.interview ? <article className="appointment"><Show interviewer={props.interview.interviewer.name} student={props.interview.student} /></article> : <article className="appointment"><Empty /></article>}
    </Fragment>
  );
}