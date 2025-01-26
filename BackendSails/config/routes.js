module.exports.routes = {
  'GET /': { action: 'home/hello-world' },

  'GET /subject': { action: 'subject/read' },
  'POST /subject': { action: 'subject/create' },
  'PUT /subject': { action: 'subject/update' },
  'DELETE /subject': { action: 'subject/delete' },
};
