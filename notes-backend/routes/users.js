const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

/* GET users listing. */
router.get("/", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);
    let sql = `SELECT * from users`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log("result", result);
      res.json(result);
    });
  });
});

/* POST auth login */

router.post("/login", function (req, res) {
  // //avkryptera lösen
  // let encrypted = CryptoJS.SHA256(req.body.passWord, "Saltnyckel").toString();

  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    let sql = `SELECT * from users`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      let foundUser = result.find((user) => {
        return (
          user.username === req.body.username &&
          user.password === req.body.password
        );
      });

      console.log(foundUser);

      if (foundUser) {
        console.log("result", result);
        return res.json(foundUser.userID);
      } else {
        res.send("Fel användarnamn eller lösen");
      }
    });
  });
});

/* POST add new user */
router.post("/add", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    // //kryptera lösen
    // let encrypted = CryptoJS.SHA256(req.body.passWord, "Saltnyckel").toString();

    let sql = `INSERT INTO users (userId, userName, passWord) VALUES 
    ("${req.body.username}", "${req.body.password}")`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("result", result);

      res.json(result);
    });
  });
});

module.exports = router;
