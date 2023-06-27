import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "Please Enter a Title"]
      },
      description: {
        type: String,
        required: false
      }
  },
  {
    timestamps: true
  }   
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;