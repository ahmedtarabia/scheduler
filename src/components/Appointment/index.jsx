import React from "react";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";

import "components/Appointment/styles.scss"

export default function Appointment (props) {
  return (
    <>
    {props.time && <article className="appointment">Appointment at {props.time}</article>}
    {!props.time && <article className="appointment">No Appointments</article>}
    </>
  )
}