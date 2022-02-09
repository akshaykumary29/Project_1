
// import
const notesModel = require("../model/notesModel");
const Notes = notesModel.notes;
const NotesModel = new notesModel.NotesModel();

class ServiceNotes {
  // save all notes
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

  // get notes
  async getNotes(req, res) {
    let foundNotes = await NotesModel.findNotes({ user_id: req.data.id });
    if (foundNotes) 
    return foundNotes;
  }

  // update notes
  async updateNotes(req, res) {
      let foundNotes = await NotesModel.searchNote(req, res);
        console.log(foundNotes);
      if (foundNotes.data) {
        let updates = await NotesModel.updateNote(req, foundNotes);
        return updates;
    }
    return foundNotes;
  }

  // delete notes
  async deleteService(req, res) {
    let foundNotes = await NotesModel.searchNote(req);
    if(foundNotes) {
      return await NotesModel.notes.deleteOne({ _id: foundNotes.data._id })
    }
  }

  // archived notes
  async isArchievedService(req, res) {
    let note = { user_id: req.data.id, isArchived: true }
    let achieved = await NotesModel.findNotes(note);
    return achieved;
  }

  // deleted notes
  async isBinService(req, res) {
    let note = { user_id: req.data.id, isDeleted: true }
    let bin = await NotesModel.findNotes(note);
    return bin;
  }
}

// export the ServiceNotes
module.exports = new ServiceNotes();
