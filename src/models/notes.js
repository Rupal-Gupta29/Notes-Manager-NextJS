import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdDate: String,
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
