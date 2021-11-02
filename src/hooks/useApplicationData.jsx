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

  function bookInterview(id, interview) {
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
          setState({
            ...state,
            appointments,
            interview: response.data,
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
          setState({
            ...state,
            appointments,
            interview: null,
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
