import { useForm } from "react-hook-form";

function LogIn({ handleLogIn, navigate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          handleLogIn(data, navigate);
        })}
      >
        <input
          {...register("username", { required: true })}
          placeholder="username..."
          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username?.type === "required" && (
          <p role="alert">Username is required</p>
        )}
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password..."
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password?.type === "required" && (
          <p role="alert">Password is required</p>
        )}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LogIn;
