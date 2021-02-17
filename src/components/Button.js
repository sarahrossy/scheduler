import React from "react";
import "components/Button.scss";
var classNames = require('classnames');


export default function Button(props) {
   // classNames function takes any number of arguments which can be a string or object. The argument 'foo' is short for { foo: true }. If the value associated with a given key is falsy, that key won't be included in the output.

   const buttonClass = classNames('button',
   {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
      </button>;
}
