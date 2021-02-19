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

export default function Appointment(props) {

 const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
        />
      )}
    </article>
  )
}