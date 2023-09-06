import { useForm } from "react-hook-form";
import websiteLogo from "../../assets/logo/just-websitelogo-ngb.png";
import "./Login.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LogIn({ handleLogIn, navigate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login-overlay">
      <div className="login-overlay__title-container">
        <h1 className="login-overlay__title"> 🥞User Login🥞</h1>
      </div>

      <div className="login">
        <div className="login__logo-container">
          <img src={websiteLogo} alt="just logo" className="login__logo" />
        </div>
        <div className="login__divider"></div>
        <form
          className="login__form"
          onSubmit={handleSubmit((data) => {
            handleLogIn(data, navigate);
          })}
        >
          <div className="login__form-username">
            <label htmlFor="username" className="login__form-label">
              Username
            </label>
            <input
              id="username"
              className="login__form-input"
              {...register("username", { required: true })}
              placeholder="username..."
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <p role="alert">Username is required</p>
            )}
          </div>
          <div className="login__form-password">
            <label htmlFor="password" className="login__form-label">
              Password
            </label>
            <input
              id="password"
              className="login__form-input"
              {...register("password", { required: true })}
              type="password"
              placeholder="password..."
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert">Password is required</p>
            )}
          </div>
          <div className="login__form-submit">
            <Link to={"/public"}>
              <Button
                variant="outlined"
                color="primary"
                className="login__form-button"
              >
                Return
              </Button>
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="login__form-button"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
