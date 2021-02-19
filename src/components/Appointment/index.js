import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

// PROPS:
// key={appointment.id}
// id={appointment.id}
// time={appointment.time}
// interview={interview}
// interviewers={interviewers}
// bookInterview={bookInterview}

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    const appointmentId = props.id;
    // transition(SAVE)
    props.bookInterview(appointmentId, interview)
    .then(() => {transition(SHOW)});  
  }

  // // ****** ternary opertor syntax/rendering
  // const toDisplay = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {/* short circuit pattern */}
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
        console.log("Clicked onAdd");
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
    </article>
  )
}