import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as icons from "react-feather";

export function Login(props) {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const to = "/dashboard";
  const { auth } = useAuth();

  const LOGIN_URL = "/notes/login";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [checkUser, setCheckUser] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(()=>{
	localStorage.setItem("persist", persist);
  },[persist]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setPwd("");
      setEmail("");
      const accessToken = response?.data?.accessToken;
      console.log(accessToken);

      console.log(auth);

      console.log("succsess");
      console.log(response);
      setAuth({ email, pwd, accessToken });
      navigate(to, { replace: true });
    } catch (err) {
      if (!err.response) {
        console.log(err);
      } else if (err.response?.status === 400) {
        setCheckUser(true);
        console.log(err);
      } else {
        console.log(err);
      }
      console.log("errr");
      errRef.current.focus();
    }
  };


  const persistToggle = ()=>{
	console.log(persist)
	setPersist(!persist)
  }

  return (
    <div className={props.func + " backface"}>
      <div className="flex flex-col backface  m-auto text-center justify-center w-[92%] py-[10%] px-[6%]">
        <h1 className="text-center text-[45px] font-bold text-color-primary pb-5">
          Noted.
        </h1>
        <h2 className="text-[25px] text-left font-semibold text-color-tercelary underline mb-5">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            ref={userRef}
            autoComplete="off"
            className="login-input"
            type="email"
            placeholder="something..@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <p
            ref={errRef}
            className={
              checkUser
                ? "opacity-100 text-color-secondary text-[12px] flex flex-row text-center"
                : "absolute top-[-5px] m-0 p-0 opacity-0 text-[0] h-0"
            }
          >
            <icons.AlertCircle color="#EC8C2D" size={16} />
            Wrong email or password
          </p>
          <input
            className="login-input"
            type="password"
            placeholder="password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <p className="mb-4 mt-1 font-medium text-color-primary">
            No account?
            <button
              type="button"
              onClick={props.bookFlip}
              className="text-color-tercelary pl-2 font-semibold  text-lg hover:underline hover:text-color-tercelary2"
            >
              Register
            </button>
          </p>
          <button
            disabled={email === "" && pwd === "" ? true : false}
            className="bg-color-tercelary rounded-lg p-2 w-[50%] mb-3 hover:bg-color-tercelary2 hover:shadow-lg shadow-md m-auto text-color-whitesh font-semibold text-lg"
          >
            Login
          </button>
          <label
            htmlFor=""
            className="relative right-1 font-medium text-color-secondary"
          >
            Keep me signed in.
            <input
              className="
					appearance-none 
					shadow-[inset_0px_0px_1px_1px_rgb(255,255,255)]
					relative
					left-2
					w-[18px]
					
					h-[18px]
					border-2
					rounded-sm
					transition
					ease-in-out
					duration-300
					border-color-tercelary
					
					hover:cursor-pointer 
				  checked:bg-color-tercelary2
				  checked:rounded-sm
				  checked:rotate-90
				  checked:bg-origin-content

				  


					active:border-[3px]
					
				  "
              type="checkbox"
			  onChange={()=>{
				return persistToggle();
			  }}
			  checked={persist}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
