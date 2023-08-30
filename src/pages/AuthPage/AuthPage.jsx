import LogIn from "../../components/LogIn/LogIn";
import Registration from "../../components/Registration/Registration";

function AuthPage(props) {
  return (
    <div>{props.className === "auth-page" ? <Registration /> : <LogIn />}</div>
  );
}

export default AuthPage;
