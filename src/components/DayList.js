import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // The DayList component should return a single <ul></ul> element with three <DayListItem /> components as children. 
  return (
    <ul>
      {/* iterate through each "day" object */}
      {props.days.map((day) => 
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