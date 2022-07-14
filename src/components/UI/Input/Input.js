import React, { forwardRef, useImperativeHandle, useRef } from "react";

import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes["input-group"]} + ${
        props.isValid === false ? classes.error : ""
      }`}
    >
      <label htmlFor={props.label}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
