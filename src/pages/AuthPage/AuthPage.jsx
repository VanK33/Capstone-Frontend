import LogIn from "../../components/LogIn/LogIn";
import Registration from "../../components/Registration/Registration";
import { useNavigate } from "react-router-dom";

function AuthPage(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div>{/* Here is going to be a large logo */}</div>
      {props.page === "registration" ? (
        <Registration />
      ) : (
        <LogIn handleLogIn={props.handleLogIn} navigate={navigate} />
      )}
    </div>
  );
}

export default AuthPage;
