if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");
//Create express app
const app = express();

//Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Connect to database
connectToDb();

app.post("/signup", usersController.signup);

app.post("/login", usersController.login);

app.get("/logout", usersController.logout);

app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/notes", requireAuth, notesController.fetchNotes);

app.get("/notes/:id", requireAuth, notesController.fetchNote);

app.post("/notes", requireAuth, notesController.createNote);

app.put("/notes/:id", requireAuth, notesController.updateNote);

app.delete("/notes/:id",requireAuth, notesController.deleteNote);

app.listen(process.env.PORT);
