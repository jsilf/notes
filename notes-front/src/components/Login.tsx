import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../models/IUser";
import { LoggedIn } from "./LoggedIn";

export const Login = () => {
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean);

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors },
  } = useForm<IUser>();
  let navigate = useNavigate();

  // setError("username", { type: "custom", message: "custom message" });

  let storageID = sessionStorage.getItem("userID");

  sessionStorage.getItem("isLoggedIn");

  console.log(storageID);

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const checkLogin = async (user: IUser) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error: status is ${response.status}`);
      }
      let userID = await response.json();

      if (userID) {
        sessionStorage.setItem("userID", JSON.stringify(userID));
        sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
        setIsLoggedIn(true);
        navigate(`/loggedin/${userID}`, { replace: true });
      } else if (!userID) {
        setMsg("Fel användarnamn eller lösen, försök igen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (user: IUser) => {
    let authUser: IUser = {
      username: user.username,
      password: user.password,
    };
    checkLogin(authUser);
  };

  return (
    <>
      {isLoggedIn ? (
        <LoggedIn />
      ) : (
        <div>
          <form
            className="form-login"
            action="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3>Logga in här</h3>
            <label htmlFor="username">Användarnamn</label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
            />
            {/* {errors.username && <p>{errors.username.message}</p>} */}
            <label htmlFor="password">Lösenord</label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
            />
            <button type="submit">Logga in</button>
          </form>
          {msg}
        </div>
      )}
    </>
  );
};
