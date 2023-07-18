import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Register } from "./Register";
import { Login } from "./Login";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

//#EC8C2D

export function AuthScreen() {
  const [register, setRegister] = useState(false);
  const [pageFlip, setPageFlip] = useState("");
  const [lastPageFlip, setLastPageFlip] = useState("");
  const [pages, setPages] = useState(["z-[2] ", "z-[3] ", "z-[4] ", "z-[5] "]);
  const [firstPage, setFirstPage] = useState("rightBookPage z-[8]");
  const { setAuth, persist, setPersist } = useAuth();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, pwd) => {
    
    const LOGIN_URL = "/notes/login";

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      
      setAuth({ email, pwd, accessToken });
      navigate("/tasks", { replace: true });
    } catch (err) {
      if (!err.response) {
        console.log(err);
      } else if (err.response?.status === 400) {
        setCheckUser(true);
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  /* Transition Funtion fro Register */
  function getRegister() {
    setRegister(() => {
      return !register;
    });
    if (!register) {
      setFirstPage((prev) => {
        return "rightBookPage z-0 book_flip border-2";
      });
      setPageFlip((prev) => {
        return "page_flip ";
      });
      setLastPageFlip((prev) => {
        return "lastPage_flip ";
      });
    } else if (register) {
      setFirstPage((prev) => {
        return "rightBookPage z-[2] lastPage_flipReverse";
      });
      setPageFlip((prev) => {
        return "";
      });
      setLastPageFlip((prev) => {
        return "lastPage_flipBack z-[5]";
      });
    }
  }

  function key() {
    let num = Math.random() * 10;
    return num;
  }

  return (
    <div className="flex  flex-col justify-center h-screen -z-20 bg-color-whitesh">
      {/* Login photo */}
      <div className="absolute login_shadow border-l-[12px] mr-1 border-color-tercelary border-r-[#f1f1f1] flex right-[50%] rounded-l-[25px] rounded-r-[10px] w-[410px] h-[510px] bg-color-whitesh">
        <img className="w-[100%] mb-20 p-16" src="../../Public/login.svg" alt="" />
        <div className="absolute text-3xl font-semibold translate-x-[-50%] left-[50%] bottom-32"><p>Test Accounts</p></div>
        <div className="absolute translate-x-[-20%] left-[20%] bottom-14">
          <button
            onClick={() => {
              handleLogin("demo1@demo1.com", "demo1");
            }}
            className="bg-color-tercelary text-xl font-semibold text-color-whitesh rounded-lg py-2 px-3"
          >
            User 1
          </button>
        </div>
        <div className="absolute translate-x-[-50%] left-1/2 bottom-14">
          <button
            onClick={() => {
              handleLogin("demo2@demo2.com", "demo2");
            }}
            className="bg-color-tercelary text-xl font-semibold text-color-whitesh rounded-lg py-2 px-3"
          >
            User 2
          </button>
        </div>
        <div className="absolute translate-x-[-80%] left-[80%] bottom-14">
          <button
            onClick={() => {
              handleLogin("demo3@demo3.com", "demo3");
            }}
            className="bg-color-tercelary text-xl font-semibold text-color-whitesh rounded-lg py-2 px-3"
          >
            User3
          </button>
        </div>
      </div>
      {/* Login */}

      <Login func={firstPage} bookFlip={getRegister} />

      {/* White Pages */}
      {/* Fist Page Turn */}
      <div className={pageFlip + pages[0] + "flex duration-[1.3s] white_pages"}>
        <img className="w-[100%] p-20" src="../../Public/welcome.svg" alt="" />
      </div>
      <div className={pageFlip + pages[1] + "flex duration-[1.5s] white_pages"}>
        <img className="w-[100%] p-20" src="../../Public/page.svg" alt="" />
      </div>
      <div className={pageFlip + pages[2] + "flex duration-[1.8s] white_pages"}>
        <img className="w-[100%] p-20" src="../../Public/diary.svg" alt="" />
      </div>
      <div className={pageFlip + pages[3] + "flex duration-[2.3s] white_pages"}>
        <img className="w-[100%] p-20" src="../../Public/file.svg" alt="" />
      </div>

      {/* Last Page */}

      <div
        className={
          "z-[1]  " +
          lastPageFlip +
          " origin-[-2px] flex front absolute mr-2 rounded-r-[20px] rounded-l-[10px] left-[50%] w-[400px] h-[510px] bg-color-whitesh "
        }
      >
        <img className="w-[100%] p-16" src="../../Public/Register.svg" alt="" />
      </div>

      {/* Register Page */}
      <div className="absolute rounded-r-[25px] rounded-l-[10px] left-[50%] w-[410px] h-[506px] bg-color-whitesh origin-left border-r-[12px] border-color-tercelary   z-[0] login_shadow">
        <Register key={key()} bookFlip={getRegister} />
      </div>
    </div>
  );
}
