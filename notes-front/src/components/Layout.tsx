import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styling/style.scss";
import { LoggedIn } from "./LoggedIn";
// import { storageID } from "./Login";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  let storageID = sessionStorage.getItem("userID");
  // let savedlog = sessionStorage.getItem("isLoggedIn");
  let bool = false;

  if (storageID) {
    bool = true;
  }

  useEffect(() => {
    setIsloggedin(bool);
  }, [bool]);

  function openNav() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <header>
        <h1 onClick={openNav}>Meny</h1>
        {isOpen && (
          <>
            <div id="mySidenav" className="sidenav">
              <div className="closebtn" onClick={openNav}>
                &times;
              </div>
              {isloggedin ? (
                <>
                  <LoggedIn />
                </>
              ) : (
                <>
                  <Link to={`/`}>Logga in för att se menyn</Link>
                </>
              )}
            </div>
          </>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
