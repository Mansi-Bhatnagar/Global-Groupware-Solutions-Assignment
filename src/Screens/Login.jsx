import { useEffect, useState } from "react";
import background from "../Assets/istockphoto-1395448518-612x612.jpg";
import InputBox from "../Components/InputBox";
import { login } from "../Services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //Email Regex
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);

  //Checkers
  const checkEmail = (email) => {
    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
    } else {
      const result = emailRegex.test(email);
      if (!result) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    }
  };

  const checkPassword = (password) => {
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  //Handlers
  const emailHandler = (value) => {
    setEmail(value);
    checkEmail(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
    checkPassword(value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const response = await login(email, password);
    if (response?.status === 200) {
      toast.success("You have logged in successfully. 🎉");
      navigate("/users");
      localStorage.setItem("userToken", response?.data?.token);
    }
    console.log(response);
  };

  //Effects
  useEffect(() => {
    if (!emailError && !passwordError && email && password) {
      setSubmitBtnDisable(false);
    }
  }, [emailError, passwordError, email, password]);

  return (
    <div className="flex h-screen items-center">
      <div
        className="relative h-screen w-[45%] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center bg-[#000000be] text-center">
          <h1 className="text-5xl tracking-[1.2px] text-white">
            We haven&apos;t <br /> met before right?
          </h1>
          <div className="my-8 h-1 w-[18%] rounded-3xl bg-[#f48c06]" />
          <h3 className="text-xl font-medium tracking-[1.5px] text-white">
            Then you should try us!
          </h3>
          <p className="mt-8 w-[60%] text-xl tracking-[1.2px] text-[#ffffffb0]">
            Join thousands of satisfied users who have revolutionized their
            account management processes with{" "}
            <span className="text-2xl font-semibold text-[#f48c06]">
              {" "}
              User Vault.
            </span>{" "}
            Login now to experience the convenience and efficiency firsthand!
          </p>
        </div>
      </div>
      <div className="flex w-[55%] flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold">
          Welcome to <br />
          <span className="text-5xl text-[#f48c06]">User Vault!</span>
        </h1>
        <form onSubmit={loginHandler} className="mt-8">
          <InputBox
            id="email"
            type={"email"}
            label={"Email"}
            required={true}
            onValueChange={emailHandler}
          />
          {emailError ? (
            <p className="mb-2 text-sm text-red-600">{"* " + emailError}</p>
          ) : (
            ""
          )}
          <InputBox
            id="password"
            type={"password"}
            label={"Password"}
            required={true}
            onValueChange={passwordHandler}
          />
          {passwordError ? (
            <p className="mb-2 text-sm text-red-600">{"* " + passwordError}</p>
          ) : (
            ""
          )}
          <button
            disabled={submitBtnDisable}
            onClick={loginHandler}
            type="submit"
            className="mt-8 w-full rounded-[30px] border-2 border-[#f48c06] bg-[#f48c06] px-4 py-3 text-xl font-medium tracking-[1.2px] text-white outline-none transition-all duration-500 ease-in-out hover:scale-95 hover:cursor-pointer hover:transition-all hover:duration-500 hover:ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
