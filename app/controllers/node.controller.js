let node = require('../models/node.model.js');

/**
 * Create Node
 * @param req
 * @param res
 * @returns {*|void}
 */
exports.create = function (req, res) {
  if (!req.body.title || !req.body.description || !req.body.iban || !req.body.name) {
    return res.status(400).send({message: "Not filled mandatory data."});
  }
  let currentNode = new node({
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
  currentNode.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while creating the node."});
    } else {
      res.send(data);
    }
  });
};

/**
 * Get all Nodes
 * @param req
 * @param res
 */
exports.findAll = function (req, res) {
  node.find(function (err, nodes) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while retrieving Nodes."});
    } else {
      res.send(nodes);
    }
  });
};

/**
 * Get Node by ID
 * @param req
 * @param res
 */
exports.findOne = function (req, res) {
  node.findById(req.params.id, function (err, node) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Node not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Error retrieving Node with id " + req.params.id});
    }
    if (!node) {
      return res.status(404).send({message: "Node not found with id " + req.params.id});
    }
    res.send(node);
  });
};

/**
 * Update Node
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  node.findById(req.params.id, function (err, node) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Node not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Error finding node with id " + req.params.id});
    }
    if (!node) {
      return res.status(404).send({message: "Node not found with id " + req.params.id});
    }
    if (req.body.title) { node.title = req.body.title; }
    if (req.body.name) { node.name = req.body.name; }
    if (req.body.image) { node.image = req.body.image; }
    if (req.body.description) { node.description = req.body.description; }
    if (req.body.status) { node.status = req.body.status; }
    if (req.body.bank) { node.bank = req.body.bank; }
    if (req.body.iban) { node.iban = req.body.iban; }
    if (req.body.bic) { node.bic = req.body.bic; }
    if (req.body.swift) { node.swift = req.body.swift; }
    if (req.body.holder) { node.holder = req.body.holder; }
    if (req.body.refs) { node.refs = req.body.refs; }
    node.save(function (err, data) {
      if (err) {
        res.status(500).send({message: "Could not update node with id " + req.params.id});
      } else {
        res.send(data);
      }
    });
  });
};

/**
 * Delete Node
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
  node.findByIdAndRemove(req.params.id, function (err, node) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Node not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Could not delete hlpSeeker with id " + req.params.id});
    }
    if (!node) {
      return res.status(404).send({message: "Node not found with id " + req.params.id});
    }
    res.send({message: "Node deleted successfully!"})
  });
};
