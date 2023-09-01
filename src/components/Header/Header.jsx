import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header(props) {
  const [token, setToken] = useState(false);

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      setToken(true);
    }
  }, []);

  return (
    <div>
      <div>
        <div>
          {props.token ? (
            <Button> Post </Button>
          ) : (
            <Button> placeholder </Button>
          )}
          <Button onClick={props.handleRandomRecipe}> Try My Luck </Button>
          <div>
            {props.token ? (
              <Button> Personal Profile </Button>
            ) : (
              <div>
                <Link to={"/auth/login"}>
                  <Button>LogIn</Button>
                </Link>
                <Link to={"/auth/registration"}>
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          <div>
            <a href="www.linkedin.com/in/jeff-yifei-ma">
              <img src="" alt="linked in icon" />
            </a>
            <a href="https://github.com/VanK33">
              <img src="" alt="github icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
