import { useState } from "react";
import { Link } from "react-router-dom";

export const LoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let storageID = sessionStorage.getItem("userID");

  // sessionStorage.getItem("isLoggedIn");
  sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    console.log("Utloggad");
    sessionStorage.clear();
  };

  return (
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
  );
};
