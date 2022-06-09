const express = require("express");
const router = express.Router();
// const mysql = require("mysql2");
main();

async function main() {
  // get the client
  const mysql = require("mysql2/promise");
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "notes",
    password: "3$ADBt]#8@$3PtG",
    database: "notes",
  });

  /* GET users listing. */
  router.get("/", async function (req, res) {
    try {
      const [rows] = await connection.execute(`SELECT * from users`);

      console.log("result", rows);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  });

  /* POST auth login */
  router.post("/login", async function (req, res) {
    // //avkryptera lösen
    // let encrypted = CryptoJS.SHA256(req.body.passWord, "Saltnyckel").toString();

    try {
      // query database
      const [rows] = await connection.execute(`SELECT * from users`);

      let foundUser = rows.find((user) => {
        return (
          user.username === req.body.username &&
          user.password === req.body.password
        );
      });

      if (foundUser) {
        console.log("result", rows);
        return res.status(200).json(foundUser.userID);
      } else {
        res.status(401).send("Fel användarnamn eller lösen");
      }
    } catch (error) {
      console.log(error);
    }
  });

  /* POST add new user */
  router.post("/add", async function (req, res) {
    try {
      // const saveUserName = mysql.escape(req.body.username);
      // const saveUserPassword = mysql.escape(req.body.password);

      //kryptera lösen
      // let encrypted = CryptoJS.SHA256(req.body.passWord, "Saltnyckel").toString();

      const [rows] =
        await connection.execute(`INSERT INTO users (userName, passWord) VALUES 
      ('${req.body.username}', '${req.body.password}')`);

      console.log("result", rows);

      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = router;
