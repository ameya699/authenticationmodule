const express = require("express");

const expressrouter = express.Router();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/noteRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", notesRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@ameyascluster.l8f6hxs.mongodb.net/UserNotes?retryWrites=true&w=majority"
  )
  .then((resp) => {
    app.listen(PORT, (req, res) => {
      console.log(`listening on port ${PORT}`);
      console.log(resp.connection);
    });
  })
  .catch((err) => console.log(err));
