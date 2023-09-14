import { FormEventHandler, useState } from "react";

const RegisterPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formSubmitHandler: FormEventHandler = (e) => {
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
  };

  return (
    <main className={`flex-1 flex flex-col items-center p-16 gap-8`}>
      <h1 className={`text-4xl font-bold`}>Create New Account</h1>
      <form
        className={`flex flex-col w-1/4 gap-4 text-xl`}
        onSubmit={formSubmitHandler}
      >
        {error && (
          <span className={`text-red-500 font-semibold text-center`}>
            {error}
          </span>
        )}
        <div className={`flex flex-col gap-2`}>
          <label htmlFor="email" className={`font-semibold`}>
            E-Mail :
          </label>
          <input
            type="email"
            id="email"
            required={true}
            className={`border border-black p-2`}
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
        <div className={`flex flex-col gap-2`}>
          <label htmlFor="password2" className={`font-semibold`}>
            Repeat Password :
          </label>
          <input
            type="password"
            id="password2"
            required={true}
            className={`border border-black p-2`}
            value={enteredPassword2}
            onChange={(e) => setEnteredPassword2(e.target.value)}
          />
        </div>
        <div className={`flex justify-center`}>
          <button type={"submit"} className={`p-2 bg-neutral-200`}>
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
