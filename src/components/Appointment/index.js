import React, { Fragment } from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS";
const ERROR = "ERROR";
const CREATE = "CREATE";
const DELETING = "DELETING";

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
    transition(STATUS);
    props.bookInterview(appointmentId, interview)
      .then(() => transition(SHOW));
  }

  // function edit() {
    
  // }

  function cancelBooking() {

    transition(DELETING);
    props.cancelInterview(props.id)
    // promise waits until function is done rendering, then executes because of the () => {}
      .then(() => transition(EMPTY))
  }

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
          onDelete={cancelBooking}
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
      {mode === STATUS && (
        <Status
          message="Saving..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancelBooking}
          onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting..."
        />
      )}
    </article>
  )
}