import { FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/Auth.tsx";

const LoginPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useLogin();

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login.mutate({
        username: enteredUsername.trim(),
        password: enteredPassword.trim(),
      });
      navigate("/");
    } catch (e) {
      setEnteredPassword("");
      console.error(e);
    }
  };

  const displayedError = error || login.error?.message;

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      <section
        className={`w-1/4 h-fit border-2 border-secondary rounded-lg shadow
        flex flex-col p-16 items-center gap-8`}
      >
        <h1 className={`text-4xl font-bold`}>Sign-In</h1>
        {login.isLoading ? (
          <div className={`flex justify-center p-4`}>
            <p className={`text-2xl font-bold`}>Loading...</p>
          </div>
        ) : (
          <form
            className={`flex flex-col gap-4 w-full text-xl`}
            onSubmit={formSubmitHandler}
          >
            {displayedError && (
              <div className={`flex justify-center`}>
                <span className={`text-xl text-red-500`}>{displayedError}</span>
              </div>
            )}
            <div className={`flex flex-col gap-2`}>
              <label htmlFor="username" className={`font-semibold`}>
                Username :
              </label>
              <input
                type="text"
                id="username"
                required={true}
                className={`input`}
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
              />
            </div>

            <div className={`flex flex-col gap-2`}>
              <label htmlFor="password" className={`font-semibold`}>
                Password :
              </label>
              <input
                type="password"
                id="password"
                required={true}
                className={`input`}
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </div>

            <div className={`flex justify-center mt-4`}>
              <button type={"submit"} className={`btn`}>
                Login
              </button>
            </div>
          </form>
        )}
        <div className={`flex flex-col text-xl text-center`}>
          <p>Don't have an account yet ?</p>
          <p>
            Register{" "}
            <Link to={"/register"} className={`underline`}>
              here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
