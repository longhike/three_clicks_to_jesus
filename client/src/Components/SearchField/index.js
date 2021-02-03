import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

function SearchField(props) {
  return (
    <Form>
      <Form.Group controlId="search">
        <Form.Label>Search for a wikipedia article</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search term or phrase"
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <ButtonGroup onClick={props.doSearch}>
        <Button>Go</Button>
      </ButtonGroup>
    </Form>
  );
}
export default SearchField;
