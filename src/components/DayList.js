import React from "react";
import DayListItem from "components/DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
  {
    id: 3,
    name: "Thursday",
    spots: 0,
  },
  {
    id: 3,
    name: "Friday",
    spots: 0,
  },
];

export default function DayList(props) {
  // The DayList component should return a single <ul></ul> element with three <DayListItem /> components as children. 
  return (
    <ul>
      {/* iterate through each "day" object */}
      {days.map((day) => 
        <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
      )}
    </ul>
  )
}