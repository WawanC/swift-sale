import { FormEventHandler, useState } from "react";
import { useRegister } from "../hooks/Auth.tsx";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const register = useRegister();
  const navigate = useNavigate();

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (enteredPassword !== enteredPassword2) {
      setEnteredPassword("");
      setEnteredPassword2("");
      return setError("Password doesnt matched");
    }

    if (enteredPassword.trim().length < 6) {
      setEnteredPassword("");
      setEnteredPassword2("");
      return setError("Password must be at least 6 characters long");
    }

    if (enteredUsername.trim().length < 6) {
      setEnteredUsername("");
      setEnteredPassword("");
      setEnteredPassword2("");
      return setError("Username must be at least 6 characters long");
    }

    try {
      await register.mutate({
        email: enteredEmail.trim(),
        username: enteredUsername.trim(),
        password: enteredPassword.trim(),
      });

      navigate("/");
    } catch (e) {
      setEnteredPassword("");
      setEnteredPassword2("");
      console.error(e);
    }
  };

  const displayedError = error || register.error?.message;

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      <section
        className={`h-fit border-2 border-secondary rounded-lg shadow
        flex flex-col px-16 py-4 items-center gap-8`}
      >
        <h1 className={`text-4xl font-bold text-center`}>Create an Account</h1>
        {register.isLoading ? (
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
              <label htmlFor="email" className={`font-semibold`}>
                E-Mail :
              </label>
              <input
                type="text"
                id="email"
                required={true}
                className={`input`}
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
            </div>

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

            <div className={`flex flex-col gap-2`}>
              <label htmlFor="password2" className={`font-semibold`}>
                Repeat Password :
              </label>
              <input
                type="password"
                id="password2"
                required={true}
                className={`input`}
                value={enteredPassword2}
                onChange={(e) => setEnteredPassword2(e.target.value)}
              />
            </div>

            <div className={`flex justify-center mt-4`}>
              <button type={"submit"} className={`btn`}>
                Register
              </button>
            </div>
          </form>
        )}
        <div className={`flex flex-col text-xl text-center`}>
          <p>Already have an account ?</p>
          <p>
            Login{" "}
            <Link to={"/login"} className={`underline`}>
              here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
