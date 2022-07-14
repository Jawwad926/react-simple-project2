import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AuthContext from "../../store/auth-context";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./LogIn.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.includes("@") };
  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: state.value.includes("@") };
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT")
    return { value: action.val, isValid: action.val.trim().length > 6 };
  if (action.type === "INPUT_BLUR")
    return { value: state.value, isValid: state.value.trim().length > 6 };
  return { value: "", isValid: false };
};

const LogIn = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.value, passwordState.value]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) authCtx.onLogIn(emailState.value, passwordState.value);
    else if (!emailState.isValid) emailInputRef.current.focus();
    else passwordInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={formSubmitHandler}>
        <Input
          isValid={emailState.isValid}
          ref={emailInputRef}
          label={"E-mail"}
          type={"email"}
          name={"email"}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordState.isValid}
          ref={passwordInputRef}
          label={"Password"}
          type={"password"}
          name={"password"}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.action}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default LogIn;
