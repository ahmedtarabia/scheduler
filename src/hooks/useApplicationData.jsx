import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //state defined and exported to Application.js
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // Make day the current day
  const setDay = (day) => setState({ ...state, day });

  //Book an appointment
  function bookInterview(id, interview, isNew) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/appointments/${id}`, { interview })
        .then((response) => {
          console.log(response);

          const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          //To update newSpots by -1 when an interview is booked
          const newSpots = isNew
            ? updateSpots(id, -1, [...state.days])
            : [...state.days];
          //set new state when interview is booked.
          setState({
            ...state,
            appointments,
            // days,
            newSpots,
          });
          setTimeout(() => {
            resolve();
          }, 50);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  //Cancel existing appointments
  function cancelInterview(id, interview) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then((response) => {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          //To update newSpots by +1 when an interview is cancelled.
          const newSpots = updateSpots(id, 1, [...state.days]);
          //set new state when interview is cancelled.
          setState({
            ...state,
            appointments,
            interview: null,
            newSpots,
          });
          setTimeout(() => {
            resolve();
          }, 50);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  function updateSpots(id, value, days) {
    //loop through the days, find day that is updated then find num of appointments for that day which is new appointmnet object updated.
    days.forEach((day) => {
      if (day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value;
      }
    });
    return days;
  }

  //Make axios calls to server to fetch data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
