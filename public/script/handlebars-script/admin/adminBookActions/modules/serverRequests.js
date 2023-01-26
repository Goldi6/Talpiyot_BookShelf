const uploadNewBook = async (data) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const path = `/admin/books`;
  return await fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      //TODO: handle error
    });
};

const updateBook = async (data, id) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const path = `/admin/books/${id}`;
  return await fetch(path, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers,
  })
    .then((book) => {
      return book.json();
    })
    .catch((err) => {
      //TODO : handle error
    });
};

const deleteBook = async (id) => {
  const path = `/admin/books/${id}`;
  return await fetch(path, {
    method: "DELETE",
  })
    .then((book) => {
      return book.json();
    })
    .catch((err) => {
      //TODO : HANDLE UI ERROR
    });
};

export { deleteBook, updateBook, uploadNewBook };
