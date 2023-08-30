import LogIn from "../../components/LogIn/LogIn";
import Registration from "../../components/Registration/Registration";

function AuthPage(props) {
  return (
    <div>
      <div>{/* Here is going to be a large logo */}</div>
      {props.page === "registration" ? <Registration /> : <LogIn />}
    </div>
  );
}

export default AuthPage;
