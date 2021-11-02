import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

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

          const newSpots = isNew
            ? updateSpots(id, -1, [...state.days])
            : [...state.days];

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
          const newSpots = updateSpots(id, 1, [...state.days]);
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
    //loop through the days, find day that is updated then find num of appointments for that day which is new appointmnet object updated.  -> forEach... look for the nul and count them. -> double for loop...
    days.forEach((day) => {
      if (day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value;
      }
    });
    return days;
  }

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
