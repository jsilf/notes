import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styling/style.scss";
// import { storageID } from "./Login";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [id, setId] = useState<any>();
  const [isloggedin, setIsloggedin] = useState(false);
  let storageID = sessionStorage.getItem("userID");
  let savedlog = sessionStorage.getItem("isLoggedIn");
  let bool = false;

  if (savedlog === "true") {
    bool = true;
  }

  useEffect(() => {
    setIsloggedin(isloggedin);
  }, [isloggedin]);

  useEffect(() => {
    setIsloggedin(bool);
  }, [bool]);

  function openNav() {
    setIsOpen(!isOpen);
  }

  console.log(isloggedin);

  return (
    <>
      <header>
        <span onClick={openNav} className="burger">
          Meny
        </span>
        {isOpen && (
          <>
            <div id="mySidenav" className="sidenav">
              <div className="closebtn" onClick={openNav}>
                &times;
              </div>
              {!isloggedin ? (
                <Link to={`/`}>Logga in för att se menyn</Link>
              ) : (
                <>
                  <Link to={`/posts/${storageID}`}>Mina dokument</Link>
                  <Link to={"/"}>Alla användare</Link>
                  <Link to={"/"}>Alla dokument</Link>
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
