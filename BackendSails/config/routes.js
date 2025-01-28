module.exports.routes = {
  'GET /': { action: 'home/hello-world' },

  'GET /subjects': { action: 'subjects/read' },
  'POST /subjects': { action: 'subjects/create' },
  'PUT /subjects': { action: 'subjects/update' },
  'DELETE /subjects': { action: 'subjects/delete' },
};
