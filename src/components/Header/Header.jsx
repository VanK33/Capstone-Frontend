import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import PublicPage from "../../pages/PublicPage/PublicPage";
import AuthPage from "../../pages/AuthPage/AuthPage";
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
      {token ? <div> hello </div> : <div>bye</div>}
      <Link to={"/"}>text</Link>

      <div>
        <div>
          {/* <button> Post </button> */}
          {/* {props.token && <button> Post </button>} */}
          {/* 这里或许需要改成ternary op,然后:的地方创建一个transparent placeholder */}
          <Button onClick={props.handleRandomRecipe}> Try My Luck </Button>
          <div>
            {!props.token ? (
              <Button> Personal Profile </Button>
            ) : (
              <div>
                <Link to={<AuthPage page={`login`} />}>
                  <Button>LogIn</Button>
                </Link>
                <Link to={<AuthPage page={`registration`} />}>
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          <div>
            <a href="www.linkedin.com/in/jeff-yifei-ma">
              <img>{/* LinkedIn */}</img>
            </a>
            <a href="https://github.com/VanK33">
              <img>{/* Github */}</img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
