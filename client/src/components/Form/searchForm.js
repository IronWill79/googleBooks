import React from "react";
import "../../components/Form/search.css";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

function SearchForm(props) {
  return (
    <Form className="search">
      <FormGroup>
        <Label for="Search"> Search </Label>{" "}
        <Input
          type="text"
          name="search"
          id="Search"
          placeholder="Search a book"
          onChange={props.onChange}
        />{" "}
      </FormGroup>{" "}
      <Button type="submit" onClick={props.handleFormSubmit}>
        Submit{" "}
      </Button>{" "}
    </Form>
  );
}

export default SearchForm;
