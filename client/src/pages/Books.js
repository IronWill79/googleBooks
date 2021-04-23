import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/Form/searchForm";
import SearchResult from "../components/Search/searchResult";

import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [search, setSearch] = useState("");
  // // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getBooks()
  //     .then(res =>
  //       setBooks(res.data)
  //     )
  //     .catch(err => console.log(err));
  // };

  // // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // // Handles updating component state when the user types into the input field
  //  handleInputChange=(event)=>{
  //   const { name, value } = event.target;
  //   setFormObject({...formObject, [name]: value})
  // };

  // // When the form is submitted, use the API.saveBook method to save the book data
  // // Then reload books from the database
  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.googlebooks(search).then((res) => {
      let results = res.data.items;
      results = results.map((result) => {
        // console.log(result.volumeInfo.imageLinks.thumbnail ? true : false);
        result = {
          key: result.id,
          id: result.id,
          title: result.volumeInfo.title,
          author: result.volumeInfo.authors,
          description: result.volumeInfo.description,
          link: result.volumeInfo.infoLink,
          image: result.volumeInfo.imageLinks?.thumbnail,
        };
        return result;
      });
      setBooks(results);
    });
  };

  const handleInputChange = (event) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    setSearch(value);
  };
  const handleSave = (event) => {
    event.preventDefault();

    let save = books.filter((book) => book.id === event.target.id);
    console.log(save);
    const data = {
      title: save[0].title,
      author: save[0].author,
      description: save[0].description,
      image: save[0].image,
    };

    console.log(data);
    API.saveBook(data)
      .then((res) => {
        alert("book saved");
        console.log(res);
        console.log(data);
      })
      .catch((err) => {
        console.log(data);
        console.log("book not saved");
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <Jumbotron>
        <h1 className="text-black">
          Find Your Favorite Books with GoogleBook API
        </h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col size="12">
            <SearchForm
              handleFormSubmit={handleFormSubmit}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <SearchResult books={books} handleSave={handleSave} />
      </Container>
    </Container>
  );
}

export default Books;
