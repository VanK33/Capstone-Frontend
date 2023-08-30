import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import PublicPage from "../../pages/PublicPage/PublicPage";
import AuthPage from "../../pages/AuthPage/AuthPage";

function Header(props) {
  return (
    <div>
      <Link to={<PublicPage />}>{/*这里是Logo */}</Link>

      <div>
        {props.token && <Button> Post </Button>}
        <Button onClick={props.handleRandomRecipe}> Try My Luck </Button>
        <div>
          {!props.token ? (
            <Button> Personal Profile </Button>
          ) : (
            <div>
              <Link to={<AuthPage className={`login-page`} />}>
                <Button>LogIn</Button>
              </Link>
              <Link to={<AuthPage className={`auth-page`} />}>
                <Button>Register</Button>
              </Link>
            </div>
          )}

          <div>
            <a
              href="www.linkedin.com/in/jeff-yifei-ma"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img>{/* LinkedIn */}</img>
            </a>
            <a
              href="https://github.com/VanK33"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img>{/* Github */}</img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
