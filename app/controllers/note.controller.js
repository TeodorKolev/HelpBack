let helpSeeker = require('../models/note.model.js');

/**
 * Create HelpSeeker
 * @param req
 * @param res
 * @returns {*|void}
 */
exports.create = function (req, res) {
  if (!req.body.title || !req.body.description || !req.body.iban || !req.body.name) {
    return res.status(400).send({message: "Not filled mandatory data."});
  }
  let currentHelpSeeker = new helpSeeker({
    title: req.body.title,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    status: req.body.status,
    bank: req.body.bank,
    iban: req.body.iban,
    bic: req.body.bic,
    swift: req.body.swift,
    holder: req.body.holder,
    refs: req.body.refs
  });
  currentHelpSeeker.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while creating the HelpSeeker."});
    } else {
      res.send(data);
    }
  });
};

/**
 * Get all HelpSeekers
 * @param req
 * @param res
 */
exports.findAll = function (req, res) {
  helpSeeker.find(function (err, helpSeekers) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while retrieving HelpSeekers."});
    } else {
      res.send(helpSeekers);
    }
  });
};

/**
 * Get HelpSeeker by ID
 * @param req
 * @param res
 */
exports.findOne = function (req, res) {
  helpSeeker.findById(req.params.id, function (err, helpSeeker) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Error retrieving helpSeeker with id " + req.params.id});
    }
    if (!helpSeeker) {
      return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
    }
    res.send(helpSeeker);
  });
};

/**
 * Update HelpSeeker
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  helpSeeker.findById(req.params.id, function (err, helpSeeker) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Error finding helpSeeker with id " + req.params.id});
    }
    if (!helpSeeker) {
      return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
    }
    if (req.body.title) { helpSeeker.title = req.body.title; }
    if (req.body.name) { helpSeeker.name = req.body.name; }
    if (req.body.image) { helpSeeker.image = req.body.image; }
    if (req.body.description) { helpSeeker.description = req.body.description; }
    if (req.body.status) { helpSeeker.status = req.body.status; }
    if (req.body.bank) { helpSeeker.bank = req.body.bank; }
    if (req.body.iban) { helpSeeker.iban = req.body.iban; }
    if (req.body.bic) { helpSeeker.bic = req.body.bic; }
    if (req.body.swift) { helpSeeker.swift = req.body.swift; }
    if (req.body.holder) { helpSeeker.holder = req.body.holder; }
    if (req.body.refs) { helpSeeker.refs = req.body.refs; }
    helpSeeker.save(function (err, data) {
      if (err) {
        res.status(500).send({message: "Could not update helpSeeker with id " + req.params.id});
      } else {
        res.send(data);
      }
    });
  });
};

/**
 * Delete HelpSeeker
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  helpSeeker.findByIdAndRemove(req.params.id, function (err, helpSeeker) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Could not delete hlpSeeker with id " + req.params.id});
    }
    if (!helpSeeker) {
      return res.status(404).send({message: "HelpSeeker not found with id " + req.params.id});
    }
    res.send({message: "HelpSeeker deleted successfully!"})
  });
};
