import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IUserData {
  username: string;
  password: string;
}

export const Login = () => {
  // const [msg, setMsg] = useState("Logga in här");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean);
  // const [ID, setID] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>();

  let storageID = sessionStorage.getItem("userID");
  sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  const onSubmit = (user: IUserData) => {
    let authUser: IUserData = {
      username: user.username,
      password: user.password,
    };
    checkLogin(authUser);
  };

  const checkLogin = async (user: IUserData) => {
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
      // setID(userID);

      sessionStorage.setItem("userID", userID);

      setIsLoggedIn(true);
      sessionStorage.getItem("isLoggedIn");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    console.log("Utloggad");
    sessionStorage.clear();
  };

  return (
    <>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/">
              <button onClick={handleLogoutClick}>Logga ut </button>
            </Link>
            <div>
              <p>Du är nu inloggad</p>
            </div>
            <h4>
              <Link to={`/posts/${storageID}`}>Mina dokument</Link>
            </h4>
          </>
        ) : (
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
            <label htmlFor="password">Lösenord</label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
            />
            <button type="submit">Logga in</button>
          </form>
        )}
      </div>
      {/* <ErrorMessage errors={errors} /> */}
    </>
  );
};
