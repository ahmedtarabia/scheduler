import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", {
    //day-list__item passed to all
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = (number) => {
    if (number === 0) {
      return "no spots remaining";
    } else if (number === 1) {
      return "1 spot remaining";
    }
    return `${number} spots remaining`;
  };

  return (
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
