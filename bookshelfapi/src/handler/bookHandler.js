const { nanoid } = require('nanoid');
const books = require('../data/books');
const res = require('../utils/response');

// Add Book Handler
module.exports.addBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Check Name
  if (!name) {
    return res.badRequest('Gagal menambahkan buku. Mohon isi nama buku', h);
  }

  // Check Read Page
  if (readPage > pageCount) {
    return res.badRequest('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', h);
  }

  // Create New Book
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt,
  };
  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return res.created('Buku berhasil ditambahkan', { bookId: id }, h);
  }
  return res.serverError('Failed to add book. Internal Server Error ! ');
};

// Get Book Handler
module.exports.getBook = (request, h) => {
  const { id } = request.params;

  // If id exist, find by id. else find all
  if (id) {
    const book = books.filter((n) => n.id === id).map((b) => {
      const getBook = b;
      getBook.finished = (b.readPage === b.pageCount);
      return getBook;
    })[0];
    if (book) {
      return res.successData({ book }, h);
    }
    return res.notFound('Buku tidak ditemukan', h);
  }

  let getBooks = books.map((b) => {
    const getBook = b;
    getBook.finished = (b.readPage === b.pageCount);
    return getBook;
  });

  // init param query
  const { name, reading, finished } = request.query;

  // check name with query
  if (name !== undefined) {
    getBooks = getBooks.filter((book) => book.name.toLowerCase()
      .indexOf(name.toLowerCase()) >= 0);
  }

  // check reading with query
  if (reading !== undefined) {
    getBooks = getBooks.filter((book) => book.reading === Boolean(parseInt(reading, 10)));
  }

  // check finished with query
  if (finished !== undefined) {
    getBooks = getBooks.filter((book) => book.reading === Boolean(parseInt(reading, 10)));
  }

  getBooks = getBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return res.successData({ books: getBooks }, h);
};

// Update Book Handler
module.exports.updateBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();

    // Check Name
    if (!name) {
      return res.badRequest('Gagal memperbarui buku. Mohon isi nama buku', h);
    }

    // Check Read Page
    if (readPage > pageCount) {
      return res.badRequest('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', h);
    }

    // Update Book
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      return res.successMessage('Buku berhasil diperbarui', h);
    }
    return res.serverError('Gagal memperbarui buku. Internal Server Error !');
  }
  return res.notFound('Gagal memperbarui buku. Id tidak ditemukan', h);
};

// Delete Book Handler
module.exports.deleteBook = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return res.successMessage('Buku berhasil dihapus', h);
  }
  return res.notFound('Buku gagal dihapus. Id tidak ditemukan', h);
};
