import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header({ currentUser, handleRandomRecipe }) {
  console.log("Header CurrentUser", currentUser);

  return (
    <div>
      <div>
        <div>
          {currentUser ? (
            <Button> Post </Button>
          ) : (
            <Button> placeholder </Button>
          )}
          <Button onClick={handleRandomRecipe}> Try My Luck </Button>
          <div>
            {currentUser ? (
              <Link to={`/auth/${currentUser.id}/profile`}>
                <Button> Personal Profile </Button>
              </Link>
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
            <a href="https://www.linkedin.com/in/jeff-yifei-ma">
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
