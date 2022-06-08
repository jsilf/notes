const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

/* GET document posts */
router.get("/", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) console.log(err);

    let sql = `SELECT * FROM posts`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) console.log(err);

      console.log("Result: ", result);

      res.json(result);
    });
  });
});

/* GET documents from specific user */
router.get("/user/:id", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT * FROM posts WHERE user='${req.params.id}'`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("Result: ", result);
      res.json(result);
    });
  });
});

/* GET specific post from specific user */
router.get("/user/post/:id", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT content, title, postID FROM posts WHERE postID='${req.params.id}'`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("Result: ", result);
      console.log(req.params.id);
      res.json(result);
    });
  });
});

/* POST new document posts */
router.post("/add", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `INSERT INTO posts (user, title, content) VALUES 
    ('${req.body.user}', '${req.body.title}', '${req.body.content}')`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("Result: ", result);
      res.status(200).json("Nytt dokument sparat");
    });
  });
});

/* UPDATE posts */
router.put("/update/:id", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `UPDATE posts SET title='${req.body.title}', content='${req.body.content}' WHERE user='${req.body.user}' AND postID='${req.params.id}'`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("Result: ", result);
      res.json(result);
    });
  });
});

/* DELETE posts */
router.delete("/delete/:id", function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = `DELETE FROM posts WHERE postID='${req.params.id}' AND user='${req.body.user}'`;

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("Result: ", result);
      res.json(result);
    });
  });
});

module.exports = router;
