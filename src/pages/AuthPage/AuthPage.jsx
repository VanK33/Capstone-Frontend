import LogIn from "../../components/LogIn/LogIn";
import Registration from "../../components/Registration/Registration";
import { useState, useEffect } from "react";

function AuthPage(props) {
  return (
    <div>
      <div>{/* Here is going to be a large logo */}</div>
      {props.page === "registration" ? (
        <Registration />
      ) : (
        <LogIn handleLogIn={props.handleLogIn} />
      )}
    </div>
  );
}

export default AuthPage;
