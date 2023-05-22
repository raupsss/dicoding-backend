const { nanoid } = require('nanoid');
const notes = require('./notes');

// Create Notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        newNote,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal ditambahkan',
    data: {
      noteId: id,
    },
  });

  response.code(500);
  return response;
};

// Get All Notes
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// Get Notes By ID
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Update Notes
const editNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  const updateNote = {
    title, tags, body, id, updateAt,
  };

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Berhasil Edit Notes',
      data: {
        updateNote,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal Update Note',
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  const note = notes.filter((n) => n.id === id)[0];

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Berhasil Menghapus Notes',
      data: {
        note,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menghapus Notes, Note id Not Found',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteHandler, deleteNoteHandler,
};
