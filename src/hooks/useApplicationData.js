import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {

  // grouped all of the state/effect/hook things that actually execute logic --> action side of Application.js

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, []) // DO NOT FORGET DEPENDENCY ARRAY!!!

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    })

    //console.log("appointment", appointment);

    //axios wants an object -> wrap it in {}
    return axios.put(`/api/appointments/${appointment.id}`, { interview })
      // promises are chains! chained to child element index.js
      .catch(err => console.log(err))
  }

  function cancelInterview(id) {
    //console.log("cancelInterview()")
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.delete(url, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        })
      })
    // .catch(err => console.log(err))
  }

  // const [day, setDay] = useState();
  // const [interview, bookInterview] = useState();
  // const [interview, cancelInterview] = useState();


  
  //functions

   return { state, setDay, bookInterview, cancelInterview }
};