let mongoose = require('mongoose');

let NoteSchema = mongoose.Schema({
  title: { type: 'String', required: false },
  name: { type: 'String', required: true },
  image: { type: 'String', required: false },
  description: { type: 'String', required: true },
  status: { type: 'String', required: false },
  bank: { type: 'String', required: false },
  iban: { type: 'String', required: true },
  bic: { type: 'String', required: false },
  swift: { type: 'String', required: false },
  holder: { type: 'String', required: false },
  refs: [{ type: 'String', required: false }],
}, {
  timestamps: true
});

module.exports = mongoose.model('helpSeeker', NoteSchema, 'helpSeekers');