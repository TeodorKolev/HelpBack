var mongoose = require('mongoose');

var NodeSchema = new mongoose.Schema({
  title: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Zа-яА-Я '-.!"]{5,200}$/, 'is invalid']},
  name: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Zа-яА-Я '-]{5,200}$/, 'is invalid']},
  image: String,
  description: {type: String, required: false, match: [/^[a-zA-Zа-яА-Я0-9 '-.!"]{0,1000}$/, 'is invalid']},
  status: { type: 'String', required: false },
  bank: {type: String, match: [/^[a-zA-Zа-яА-Я '-]{0,200}$/, 'is invalid']},
  iban: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9 -]{5,50}$/, 'is invalid']},
  bic: {type: String, match: [/^[a-zA-Z0-9 -]{0,50}$/, 'is invalid']},
  swift: {type: String, match: [/^[a-zA-Z0-9 -]{0,50}$/, 'is invalid']},
  holder:  {type: String, match: [/^[a-zA-Zа-яА-Я '-.!"]{0,200}$/, 'is invalid']},
  refs: [String],
}, {timestamps: true});

module.exports = mongoose.model('Node', NodeSchema);