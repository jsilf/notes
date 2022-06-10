import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoggedIn = () => {
  // sessionStorage.getItem("isLoggedIn");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let storageID = sessionStorage.getItem("userID");

  let navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    navigate(`/`, { replace: true });
    sessionStorage.clear();
  };

  sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  return (
    <>
      <div className="loggedin">
        <ul>
          <li>
            <Link to={`/loggedin/${storageID}`}>Hem</Link>
          </li>
          <li>
            <Link to={`/posts/${storageID}`}>Mina dokument</Link>
          </li>
          <li>
            <Link to={`/posts/list/${storageID}`}>Lista på dokument</Link>
          </li>
          <li>
            <Link to={`/posts/add/${storageID}`}>Skapa nytt dokument</Link>
          </li>
        </ul>
        <button onClick={handleLogoutClick}>Logga ut </button>
      </div>
    </>
  );
};
