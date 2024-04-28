const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  //Find the notes
  try {
    const notes = await Note.find({ user: req.user._id });
    //Respond with them
    res.json({ notes });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  //Get id off the url
  try {
    const noteId = req.params.id;

    //Find the notes using the id
    const note = await Note.findOne({ _id: noteId, user: req.user._id });

    //Respond with the note
    res.json({ note });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try{
  //Get the data off request body
  const { title, body } = req.body;
  //create note with it
  const note = await Note.create({
    title,
    body,
    user: req.user._id,
  });
  //respond with the new note
  res.json({ note: note });
} catch (err) {
  console.log(err);
  res.sendStatus(400);
}
};

const updateNote = async (req, res) => {
  try{
  //Get id off the url
  const noteId = req.params.id;

  //Get the data off the request body
  const { title, body } = req.body;

  //Find and update the record
  await Note.findOneAndUpdate(
    { _id: noteId, user: req.user._id },
    {
      title,
      body,
    }
  );

  //Find updated note
  const note = await Note.findById(noteId);

  //Respond with the updated note
  res.json({ note: note });
} catch (err) {
  console.log(err);
  res.sendStatus(400);
}
};

const deleteNote = async (req, res) => {
  try{
  //Get id off URL
  const noteId = req.params.id;
  //Delete the note
  await Note.deleteOne({ _id: noteId, user: req.user._id });
  //Respond
  res.json({ success: "Record deleted" });
} catch (err) {
  console.log(err);
  res.sendStatus(400);
}
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
