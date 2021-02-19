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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  // make a copy of interview object, put into resultData
  const resultData = { ...interview };

  //Object.values returns an array of an objects enumerable property values
  let interviewerInfo = Object.values(state.interviewers)

  // see if the values match, if so, 
  interviewerInfo.forEach(entry => {
    if (interview.interviewer === entry.id) {
      resultData.interviewer = entry;
    }
  })
  return resultData;
};

//---- should return an object that looks like this:
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

export function getInterviewersForDay(state, day) {

  const interviewersForDay = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.interviewers.forEach((int) => {
       interviewersForDay.push(state.interviewers[int])  
      })
    }
  })
  return interviewersForDay;
};