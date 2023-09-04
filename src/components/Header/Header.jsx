import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import { PostModal } from "../Modal/Modal";

function Header({
  currentUser,
  handleRandomRecipe,
  tryLuckButton,
  closeModal,
  openPostModal,
  PostButtonCloseModal,
  isPostModalOpen,
}) {
  return (
    <div>
      <div>
        <div>
          {currentUser ? (
            <Button onClick={openPostModal}> Post </Button>
          ) : (
            <Button> placeholder </Button>
          )}
          {tryLuckButton ? (
            <Button onClick={handleRandomRecipe}> Try My Luck </Button>
          ) : (
            <Link to={"/public"}>
              <Button> Home Page </Button>
            </Link>
          )}
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

      {isPostModalOpen && (
        <PostModal
          closeModal={closeModal}
          PostButtonCloseModal={PostButtonCloseModal}
        />
      )}
    </div>
  );
}

export default Header;
