import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as icons from "react-feather";

export function Register(props) {
  //REGEX
  const PREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

  const userRef = useRef();
  const REGISTER_URL = "/notes/register";

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUSerFocus] = useState(false);

  const [pword, setPword] = useState("");
  const [validPWord, setValidPWord] = useState(false);
  const [pWordFocus, setPWordFocus] = useState(false);

  const [matchPWord, setMatchPWord] = useState("");
  const [validPMatch, setValidPMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMSg, setErrMsg] = useState("");
  const [succes, setSucces] = useState(false);

  /*  useEffect(() => {
    userRef.current.focus();
  }, []); */

  useEffect(() => {
    const resault = user;
    setValidName(resault);
  }, [user]);

  /* Controlling password flow */
  useEffect(() => {
    const resault = PREGEX.test(pword);

    setValidPWord(resault);
    const match = pword === matchPWord;
    setValidPMatch(match);
    setValidName(resault);
  }, [pword, matchPWord]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pword, matchPWord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Protection of function
    const pWord = PREGEX.test(pword);
    if (!pWord) {
      setErrMsg("Invalid action");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pword }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setErrMsg("");
      setSucces(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server Msg");
        console.log(err);
      } else if (err.response?.status === 409) {
        setErrMsg("taken");
        console.log(err);
      } else {
        setErrMsg("Registration Failer");
        console.log(err);
      }
      console.log("errr");
    }
  };

  /* console.log(props.keys); */

  return (
    <>
      {succes ? (
        <div className="flex flex-col m-auto text-center  justify-center w-[92%] py-[10%] px-[6%]  z-[4]">
          <h1 className="text-center text-[40px] font-bold text-[#EC8C2D] mb-6">
            Good Job.
          </h1>
          <img
            className="w-[50%] m-auto pb-5"
            src="../../Public/register_sucs.svg"
            alt=""
          />
          <h2 className="text-center text-[24px] font-semibold text-[#3F3D56] mb-1">
            You are registered as
          </h2>
          <p className="text-[#EC8C2D] text-[20px] font-medium mb-10">{user}</p>
          <p className="text-[#3F3D56] text-[24px] font-semibold">
            Try to{" "}
            <button
              onClick={props.bookFlip}
              className="text-[#EC8C2D] font-bold text-[32px] underline pl-2"
            >
              Login
            </button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col m-auto text-center  justify-center w-[92%] py-[10%] px-[6%]  z-[4]">
          <h1 className="text-center text-[40px] font-bold text-color-primary mb-6">
            Noted.
          </h1>
          <h2 className="text-[25px] text-left font-semibold text-color-tercelary underline mb-5">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              required
              className="login-input"
              type="email"
              name="email"
              onChange={(e) => setUser(e.target.value)}
              placeholder="something..@email.com"
            />
            <p
              className={
                errMSg === "taken"
                  ? "opacity-100 text-gray-500 text-[12px] flex flex-row text-center"
                  : "absolute top-[-5px] m-0 p-0 opacity-0 text-[0] h-0"
              }
            >
              <icons.AlertCircle color="#EC8C2D" size={16} />
              This email address is used.
            </p>
            <input
              aria-invalid={validPWord ? "false" : "true"}
              className="login-input"
              type="password"
              placeholder="password"
              onChange={(e) => setPword(e.target.value)}
              required
              onFocus={() => setPWordFocus(true)}
              onBlur={() => setPWordFocus(false)}
            />
            <p
              className={
                pWordFocus
                  ? "opacity-100 text-color-primary text-[12px] flex flex-row text-center"
                  : "absolute top-[-5px] m-0 p-0 opacity-0 text-[0] h-0"
              }
            >
              <icons.AlertCircle color="#dd7421" size={19} />
              8-16 charakters, needs to include uppercase, lowercase letters,
              and minimum 1 number
            </p>
            <input
              className="login-input"
              aria-invalid={validPMatch ? "false" : "true"}
              type="password"
              placeholder="verify password"
              onChange={(e) => setMatchPWord(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              className={
                !validPMatch && matchFocus
                  ? "opacity-100 text-color-primary text-[12px] flex flex-row text-center"
                  : "absolute top-[-5px] m-0 p-0 opacity-0 text-[0] h-0"
              }
            >
              <icons.AlertCircle color="#dd7421" size={16} />
              Password dont match
            </p>
            <p className="mb-4 mt-1 font-medium text-color-primary">
              Already registered?
              <button
                type="button"
                onClick={props.bookFlip}
                className="text-color-tercelary pl-2 font-bold text-lg underline hover:text-color-tercelary2"
              >
                Login
              </button>
            </p>
            <button
              disabled={
                !validName || !validPWord || !validPMatch ? true : false
              }
              className="bg-color-tercelary text-white font-semibold rounded-lg p-2 text-lg w-[50%] m-auto  hover:cursor-pointer hover:bg-color-tercelary2 text-color-whitesh hover:shadow-lg shadow-md"
            >
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
}
