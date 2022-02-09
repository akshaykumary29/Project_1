
// import
const logger = require('../config/logger');
const notesService = require('../service/notesService');
const ServiceNotes = require('../service/notesService');

class NotesClass {

    // add the notes
    async addNotes(req, res) {
        await ServiceNotes.createNotes(req.body).then((result) => {
            logger.info("Notes added successfully", result)
            res.status(200).json(result)
        }).catch((err) => {
            logger.error("Error in add notes", err)
            return res.status(400).send(err);
        })
    }

    // get all notes
    async getNotes(req, res) {
        await ServiceNotes.getNotes(req.body).then((result) => {
            logger.info("Get notes successful", result)
            res.status(200).json(result)
        }).catch((err) => {
            logger.error("Error in get notes", err)
            return res.status(400).send(err);
        })
    }

    // update user
    async updateNotes(req, res) {
        await ServiceNotes.updateNotes(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            logger.error("Error in update notes", err)
            return res.status(400).send(err);
        })
    }

    // delete 
    async deleteNotes(req, res) {
        await ServiceNotes.deleteService(req.body).then((result) => {
            logger.info("Delete notes sucessful", result)
            res.result(200).json(result)
        }).catch((err) => {
            logger.error("Error in delete notes", err)
            return res.status(400).send(err);
        })
    }

    // is Archived
    async isArchieved(req, res) {
        await ServiceNotes.isArchievedService(req.body).then((result) => {
            logger.info("Get isArchieved successful", result)
            res.status(200).json(result)
        }).catch((err) => {
            logger.error("Error in getingisArchieved notes", err)
            return res.status(400).send(err);
        })
    } 

    // is Deleted
    async isBin(req, res) {
        await ServiceNotes.isBinService(req.body).then((result) => {
            logger.info("get isDeleted successful", result)
            res.status(200).json(result)
        }).catch((err) => {
            logger.error("Error in getingisDeleted notes", err)
            return res.status(400).send(err);
        })
    }
}

// export the NotesClass
module.exports = new NotesClass;