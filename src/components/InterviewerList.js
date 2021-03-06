import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/Application.scss"
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

// InterviewerList takes in three props:

// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

export default function InterviewerList(props) {
  //console.log("interviewer", props.interviewers)
  const interviewers = props.interviewers.map((interviewer) =>{
  return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // or, written with the spread operator:
      // {...interviewer}

      // being passed on to child (item)
      // checks whether selected prop is t/f
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />)
  }
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}
      </ul>
    </section>
  )
}