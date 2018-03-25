module.exports = function (app) {

  let nodes = require('../controllers/node.controller.js');

  // Create a new Node
  app.post('/nodes', nodes.create);

  // Retrieve all Nodes
  app.get('/nodes', nodes.findAll);

  // Retrieve a single Node with nodeId
  app.get('/nodes/:id', nodes.findOne);

  // Update a Node with nodeId
  app.put('/nodes/:id', nodes.update);

  // Delete a Node with nodeId
  app.delete('/nodes/:id', nodes.delete);
}