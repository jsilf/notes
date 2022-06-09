const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
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

  /* GET document posts */
  router.get("/", async function (req, res, next) {
    try {
      const [rows] = await connection.execute(`SELECT * FROM posts`);

      console.log("result", rows);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  });

  /* GET documents from specific user */
  router.get("/user/:id", async function (req, res) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM posts WHERE user='${req.params.id}'`
      );

      console.log("result", rows);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  });

  /* GET specific post from specific user */
  router.get("/user/post/:id", async function (req, res) {
    try {
      const [rows] = await connection.execute(
        `SELECT content, title, postID FROM posts WHERE postID='${req.params.id}'`
      );

      console.log("result", rows);
      res.json(rows);
    } catch (error) {
      console.log(error);
    }
  });

  /* POST new document posts */
  router.post("/add", async function (req, res) {
    try {
      const [rows] = await connection.execute(
        `INSERT INTO posts (user, title, content) VALUES 
        ('${req.body.user}', '${req.body.title}', '${req.body.content}')`
      );

      console.log("result", rows);
      res.status(200).json("Nytt dokument sparat");
    } catch (error) {
      console.log(error);
    }
  });

  /* UPDATE posts */
  router.put("/update/:id", async function (req, res) {
    try {
      const [rows] = await connection.execute(
        `UPDATE posts SET title='${req.body.title}', content='${req.body.content}' WHERE user='${req.body.user}' AND postID='${req.params.id}'`
      );

      console.log("result", rows);
      res.json("Dokument ändrat");
    } catch (error) {
      console.log(error);
    }
  });

  /* DELETE posts */
  router.delete("/delete/:id", async function (req, res, next) {
    try {
      const [rows] = await connection.execute(
        `DELETE FROM posts WHERE postID='${req.params.id}' AND user='${req.body.user}'`
      );

      console.log("result", rows);
      res.json("Dokument raderat");
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = router;
