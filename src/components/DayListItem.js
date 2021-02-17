import React from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');

export default function DayListItem(props) {
  const formatSpots = function(numOfSpots) {
    if (numOfSpots === 0) {
      return 'no spots remaining'
    } else if (numOfSpots === 1) {
      return '1 spot remaining'
    } else 
    return `${numOfSpots} spots remaining`
  }
  
  const dayClass = classNames(
    'day-list', 
    {
      'day-list__item': true,
      'day-list__item--selected': props.selected,
      'day-list__item--full': (props.spots === 0)
    }
  )
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  )
}