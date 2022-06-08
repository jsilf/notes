import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styling/style.scss";
// import { storageID } from "./Login";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<any>();
  let storageID = sessionStorage.getItem("userID");
  let savedlog = sessionStorage.getItem("isLoggedIn");

  let isloggedin = true;

  if (savedlog === "true" && id === null) {
    isloggedin = false;
  }

  useEffect(() => {
    setId(storageID);
  }, [storageID]);

  function openNav() {
    setIsOpen(!isOpen);
  }

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
              {isloggedin ? (
                <Link to={`/posts/${id}`}>Mina dokument</Link>
              ) : (
                <Link to={"/"}>Mina dokument</Link>
              )}
              <Link to={"/"}>Alla användare</Link>
              <Link to={"/"}>Alla dokument</Link>
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
