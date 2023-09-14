import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formSubmitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      navigate("/");
    } catch (e) {
      setEnteredPassword("");
      console.error(e);
    }
  };

  const displayedError = error;

  return (
    <main className={`flex-1 flex flex-col items-center p-16 gap-8`}>
      <h1 className={`text-4xl font-bold`}>Sign-In</h1>
      {1 > 2 ? (
        <span className={`text-2xl font-semibold`}>Loading...</span>
      ) : (
        <form
          className={`flex flex-col w-1/4 gap-4 text-xl`}
          onSubmit={formSubmitHandler}
        >
          {displayedError && (
            <span className={`text-red-500 font-semibold text-center`}>
              {displayedError}
            </span>
          )}

          <div className={`flex flex-col gap-2`}>
            <label htmlFor="username" className={`font-semibold`}>
              Username :
            </label>
            <input
              type="text"
              id="username"
              required={true}
              className={`border border-black p-2`}
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
              className={`border border-black p-2`}
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </div>

          <div className={`flex justify-center`}>
            <button type={"submit"} className={`p-2 bg-neutral-200`}>
              Login
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default LoginPage;
