export function getAppointmentsForDay(state, day) {
  
  const appointmentsForDay = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.appointments.forEach((app) => {
        appointmentsForDay.push(state.appointments[app])
      })
    }
  })
    return appointmentsForDay;
};

// export function getAppointmentsForDay(state, day) {
//   const filteredDay = state.days.find((currentDay) => currentDay.name === day);
//   return  filteredDay ? filteredDay.appointments.map((id) => state.appointments[id]) : [];
// }

