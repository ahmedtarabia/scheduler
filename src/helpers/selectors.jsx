export function getAppointmentsForDay(state, day) {
  //getAppointmentsForDay returns an array (4ms)
  //getAppointmentsForDay returns an array with a length matching the number of appointments for that day (1ms)
  //getAppointmentsForDay returns an array containing the correct appointment objects
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].appointments.map((appointmentid) => {
        return state.appointments[appointmentid];
      });
    }
  }

  //getAppointmentsForDay returns an empty array when the days data is empty
  //getAppointmentsForDay returns an empty array when the day is not found
  return [];
}

export function getInterview(state, interview) {
  //If interview exists, return object with interviewer data.
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  //If interview does not exist, return null
  return null;
}

export function getInterviewersForDay(state, day) {
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].interviewers.map((interviewerid) => {
        return state.interviewers[interviewerid];
      });
    }
  }

  return [];
}
