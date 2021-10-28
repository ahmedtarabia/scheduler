
export function getAppointmentsForDay(state, day) {
  //getAppointmentsForDay returns an array (4ms)
  //getAppointmentsForDay returns an array with a length matching the number of appointments for that day (1ms)
  //getAppointmentsForDay returns an array containing the correct appointment objects
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].appointments.map((appointmentid) => {
        return state.appointments[appointmentid]
      });
    }
  }

  //getAppointmentsForDay returns an empty array when the days data is empty
  //getAppointmentsForDay returns an empty array when the day is not found
  return [];
}