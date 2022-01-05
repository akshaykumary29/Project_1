
const notesService = require('../service/notesService');
const ServiceNotes = require('../service/notesService');

class NotesClass {
    async addNotes(req, res) {
        await ServiceNotes.createNotes(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            return res.status(401).send(err);
        })
    }

    async getNotes(req, res) {
        await ServiceNotes.getNotes(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            return res.status(400).send(err);
        })
    }

    async updateNotes(req, res) {
        await ServiceNotes.updateNotes(req.body).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            return res.status(400).send(err);
        })
    }

    async deleteNotes(req, res) {
        await ServiceNotes.deleteService(req.body).then((result) => {
            res.result(200).json(result)
        }).catch((err) => {
            return res.status(401).send(err);
        })
    }
}

// export the NotesClass
module.exports = new NotesClass;