module.exports = function (app) {

  let helpSeekers = require('../controllers/note.controller.js');

  // Create a new Note
  app.post('/helpSeekers', helpSeekers.create);

  // Retrieve all Notes
  app.get('/helpSeekers', helpSeekers.findAll);

  // Retrieve a single Note with noteId
  app.get('/helpSeekers/:id', helpSeekers.findOne);

  // Update a Note with noteId
  app.put('/helpSeekers/:id', helpSeekers.update);

  // Delete a Note with noteId
  app.delete('/helpSeekers/:id', helpSeekers.delete);
}