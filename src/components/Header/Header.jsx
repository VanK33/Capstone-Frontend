import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom";
import { PostModal } from "../Modal/Modal";
import websiteLogoNBG from "../../assets/logo/websitelogo-nbg.png";
import githubLogo from "../../assets/logo/github-icon.svg";
import linkinLogo from "../../assets/logo/linkedin-icon.svg";

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
    <>
      <div className="header">
        <div className="header__top-section">
          <div className="header__logo-section">
            <img src={websiteLogoNBG} alt="logo" className="header__logo" />
          </div>
          <div className="header__button-section">
            {currentUser ? (
              <Button
                onClick={openPostModal}
                variant="contained"
                className="header__post-button"
              >
                {" "}
                Post{" "}
              </Button>
            ) : (
              <Button
                variant="contained"
                className="header__placeholder-button"
              >
                {" "}
                placeholder{" "}
              </Button>
            )}
            {tryLuckButton ? (
              <Button
                onClick={handleRandomRecipe}
                variant="contained"
                className="header__try-button"
              >
                {" "}
                Try My Luck{" "}
              </Button>
            ) : (
              <Link to={"/public"}>
                <Button variant="contained" className="header__home-button">
                  Home Page
                </Button>
              </Link>
            )}
            <div>
              {currentUser ? (
                <Link to={`/auth/${currentUser.id}/profile`}>
                  <Button
                    variant="contained"
                    className="header__profile-button"
                  >
                    Personal Profile
                  </Button>
                </Link>
              ) : (
                <div className="header__user-buttons">
                  <Link to={"/auth/login"}>
                    <Button
                      variant="contained"
                      className="header__login-button"
                    >
                      LogIn
                    </Button>
                  </Link>
                  <Link to={"/auth/registration"}>
                    <Button
                      variant="contained"
                      className="header__register-button"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header__icon-section">
          <a href="https://www.linkedin.com/in/jeff-yifei-ma">
            <img
              src={linkinLogo}
              alt="linked in icon"
              className="header__icon"
            />
          </a>
          <a href="https://github.com/VanK33">
            <img src={githubLogo} alt="github icon" className="header__icon" />
          </a>
        </div>
      </div>

      {isPostModalOpen && (
        <PostModal
          closeModal={closeModal}
          PostButtonCloseModal={PostButtonCloseModal}
        />
      )}
    </>
  );
}

export default Header;
