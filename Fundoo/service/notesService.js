const notesModel = require("../model/notesModel");
const Notes = notesModel.notes;
const NotesModel = new notesModel.NotesModel();

class ServiceNotes {
  async createNotes(req, res) {
    let newUser = new Notes({
      title: req.title,
      description: req.description,
      colour: req.colour,
      isArchived: req.isArchived,
      isDeleted: req.isDeleted,
      user_id: req.data.id,
    });
    let saveNote = NotesModel.registerNote(newUser);
    return saveNote;
  }

  async getNotes(req, res) {
    let foundNotes = await NotesModel.findNotes({ user_id: req.data.id });
    if (foundNotes) 
    return foundNotes;
  }
}

// export the ServiceNotes
module.exports = new ServiceNotes();
