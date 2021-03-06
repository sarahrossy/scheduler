import { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay } from '../../src/components/helpers/selectors';

export default function useApplicationData() {

  // grouped all of the state/effect/hook things that actually execute logic --> action side of Application.js

  const [state, setState] = useState({
    // initial state, tiny databank that keeps track until we refresh
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // spots = 5 - appointments
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

    
    return axios.put(`/api/appointments/${appointment.id}`, { interview })
    .then(() => {
      return new Promise(
        (resolve, reject) => {
          axios.get('/api/days')
          .then((res) => {
            setState({
              ...state,
              appointments,
              days: res.data
            })
            resolve();
          })
        }
      )
    })
  
  };

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
        return new Promise(
          (resolve, reject) => {
            axios.get('/api/days')
            .then((res) => {
              setState({
                ...state,
                appointments,
                days: res.data
              })
              resolve();
            })
          }
        )
      })
  };

   return { state, setDay, bookInterview, cancelInterview }
};