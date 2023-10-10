const express = require("express");
const notesRouter = express.Router();

notesRouter.get("/signup", (req, res) => {
  res.send("note get request");
});

notesRouter.post("/login", (req, res) => {
  res.send("note put request");
});

module.exports = notesRouter;
