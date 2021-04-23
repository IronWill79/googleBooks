import React, { useState, useEffect } from "react";
import API from "../utils/API";
import "./save.css";

function Save() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = (e) => {
    API.getBooks()
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteHandle = (id) => {
    console.log("delete handle");
    API.deleteBook(id).then((res) => getBooks());
  };
  return books.length > 0 ? (
    <div className="save-container">
      {books.map((book) => {
        return (
          <div key={book._id} className="card">
            <div className="card-title">{book.title}</div>
            <div className="card-description">{book.description}</div>
            <div className="card-author">{book.author}</div>
            <div className="card-date">{book.date}</div>
            <div className="btn-container">
              <button onClick={() => deleteHandle(book._id)}> delete</button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>no results found</p>
  );
}

export default Save;
