import React from "react";
import useApplicationData from "../hooks/useApplicationData";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "components/helpers/selectors";

// ------ STEPS TO CREATE A COMPONENT:
// Create a file with our component name
// Create & Export the component function
// Add the base HTML in the return statement of our component
// Create & Import a CSS / SCSS file holding the style of our component
// Write stories for Storybook to render our component in isolation
// Refactor the hardcoded content to use props & state

// database reset curl command:
// curl http://localhost:8001/api/debug/reset

export default function Application(props) {

  // destructured custom hook - similar to a class
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);
  // returns an array of appointments
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          // src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"
          interviewers={interviewers} />
      </section>
    </main>
  );
}