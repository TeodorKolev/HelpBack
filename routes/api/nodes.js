var mongoose = require('mongoose');
var Node = mongoose.model('Node');
var router = require('express').Router();

/**
 * Create node
 */
router.post('/nodes', function (req, res) {
  if (!req.body.title || !req.body.description || !req.body.iban || !req.body.name) {
    return res.status(400).send({message: "Not filled mandatory data."});
  }
  var currentNode = new Node({
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
});

/**
 * Get all Nodes
 */
router.get('/', function (req, res) {
  Node.find(function (err, nodes) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Some error occurred while retrieving Nodes."});
    } else {
      res.send(nodes);
    }
  });
});


/**
 * Get Node by ID
 */
router.get('/:id', function (req, res) {
  Node.findById(req.params.id, function (err, node) {
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
});

/**
 * Update Node
 */
router.put('/:id', function (req, res) {
  Node.findById(req.params.id, function (err, node) {
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
    if (typeof req.body.title !== 'undefined') { node.title = req.body.title; }
    if (typeof req.body.name !== 'undefined') { node.name = req.body.name; }
    if (typeof req.body.image !== 'undefined') { node.image = req.body.image; }
    if (typeof req.body.description !== 'undefined') { node.description = req.body.description; }
    if (typeof req.body.status !== 'undefined') { node.status = req.body.status; }
    if (typeof req.body.bank !== 'undefined') { node.bank = req.body.bank; }
    if (typeof req.body.iban !== 'undefined') { node.iban = req.body.iban; }
    if (typeof req.body.bic !== 'undefined') { node.bic = req.body.bic; }
    if (typeof req.body.swift !== 'undefined') { node.swift = req.body.swift; }
    if (typeof req.body.holder !== 'undefined') { node.holder = req.body.holder; }
    if (typeof req.body.refs !== 'undefined') { node.refs = req.body.refs; }
    node.save(function (err, data) {
      if (err) {
        res.status(500).send({message: "Could not update node with id " + req.params.id});
      } else {
        res.send(data);
      }
    });
  });
});

/**
 * Delete Node
 */
router.delete('/:id', function (req, res) {
  Node.findByIdAndRemove(req.params.id, function (err, node) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Node not found with id " + req.params.id});
      }
      return res.status(500).send({message: "Could not delete node with id " + req.params.id});
    }
    if (!node) {
      return res.status(404).send({message: "Node not found with id " + req.params.id});
    }
    res.send({message: "Node deleted successfully!"})
  });
});

module.exports = router;
