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


