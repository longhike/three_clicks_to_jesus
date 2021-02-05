import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

function SearchField(props) {
  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      if (props.searchTerm.length > 0) {
        props.doSearch()
        props.setSearchTerm("")
      }
      }}>
      <Form.Group controlId="search">
        <Form.Label>Search for a wikipedia article</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search term or phrase"
          onChange={(e) => props.setSearchTerm(e.target.value)}
          value={props.searchTerm}
        />
      </Form.Group>
      <ButtonGroup >
        <Button type={"submit"}>Go</Button>
      </ButtonGroup>
    </Form>
  );
}
export default SearchField;
