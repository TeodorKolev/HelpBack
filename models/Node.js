var mongoose = require('mongoose');

var NodeSchema = new mongoose.Schema({
  title: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Zа-яА-Я '-.!"]{5,200}$/, 'is invalid']},
  subTitle: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Zа-яА-Я '-.!"]{5,200}$/, 'is invalid']},
  name: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Zа-яА-Я '-]{5,200}$/, 'is invalid']},
  image: String,
  description: {type: String, required: false, match: [/^[a-zA-Zа-яА-Я0-9 '-.!"]{0,2000}$/, 'is invalid']},
  status: {type: String, enum: ['ACTIVE', 'INACTIVE']},
  currency: {type: String, enum: ['BGN', 'EUR', 'USD']},
  bank: {type: String, match: [/^[a-zA-Zа-яА-Я '-]{0,200}$/, 'is invalid']},
  account: {type: String, match: [/^[a-zA-Z0-9/-]{0,100}$/, 'is invalid']},
  iban: {type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9 -]{5,50}$/, 'is invalid']},
  bic: {type: String, match: [/^[a-zA-Z0-9 -]{0,50}$/, 'is invalid']},
  swift: {type: String, match: [/^[a-zA-Z0-9 -]{0,50}$/, 'is invalid']},
  paypal: {type: String, match: [/^[a-zA-Z0-9 @.-]{0,100}$/, 'is invalid']},
  holder:  {type: String, match: [/^[a-zA-Zа-яА-Я '-.!"']{0,200}$/, 'is invalid']},
  address: {type: String, match: [/^[a-zA-Zа-яА-Я0-9 '-.,!"']{0,200}$/, 'is invalid']},
  refs: [String],
}, {timestamps: true});

mongoose.model('Node', NodeSchema);