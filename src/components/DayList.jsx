import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props);
  const days = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.setDay} //This one has to be props because we are passing it down from Application's nav
    >
      {day}
    </DayListItem>
  ));

  return <ul>{days}</ul>;
}
