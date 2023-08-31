function LogIn() {
  const logInHandler = () => {
    localStorage.setItem("token", JSON.stringify(true));
  };
  return (
    <div>
      <button onClick={logInHandler}> Login </button>
    </div>
  );
}

export default LogIn;
