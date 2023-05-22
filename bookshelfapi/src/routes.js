const bookHandler = require('./handler/bookHandler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookHandler.addBook,
  },
  {
    method: 'GET',
    path: '/books/{id?}',
    handler: bookHandler.getBook,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: bookHandler.updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: bookHandler.deleteBook,
  },
];
module.exports = routes;
