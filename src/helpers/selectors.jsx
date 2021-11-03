//fn to get all appointments for specific day
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

//fn to fetch specific interview
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

//fn to fetch all available interviews for a specific day
export function getInterviewersForDay(state, day) {
  //getInterviewersForDay returns an array (4ms)
  //getInterviewersForDay returns an array with a length matching the number of appointments for that day (1ms)
  //getInterviewersForDay returns an array containing the correct appointment objects
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].interviewers.map((interviewerid) => {
        return state.interviewers[interviewerid];
      });
    }
  }

  //getInterviewersForDay returns an empty array when the days data is empty
  //getInterviewersForDay returns an empty array when the day is not found
  return [];
}
