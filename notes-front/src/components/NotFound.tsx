import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h2>
        {" "}
        Oops, något gick fel. Klicka <Link to={"/"}>här </Link>
        för att komma tillbaka till startsidan 🤓
      </h2>
    </>
  );
};
