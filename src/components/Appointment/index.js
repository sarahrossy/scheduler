import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// ****** ternary opertor syntax/rendering
export default function Appointment(props) {
const toDisplay = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {toDisplay}
    </article>
  ) 
}