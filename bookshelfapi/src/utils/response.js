// Response Success dengan return Data
module.exports.successData = (data, h) => h.response({
  status: 'success',
  data,
}).code(200);

// Response Success dengan return Message
module.exports.successMessage = (message, h) => h.response({
  status: 'success',
  message,
}).code(200);

// Response Success Create dengan return Data dan Message
module.exports.created = (message, data, h) => h.response({
  status: 'success',
  message,
  data,
}).code(201);

// Response Gagal dengan return Message
module.exports.badRequest = (message, h) => h.response({
  status: 'fail',
  message,
}).code(400);

// Response Not Found dengan return Message
module.exports.notFound = (message, h) => h.response({
  status: 'fail',
  message,
}).code(404);

// Response Internal Error dengan return Message
module.exports.serverError = (message, h) => h.response({
  status: 'fail',
  message,
}).code(500);
