import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

function SearchField(props) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.searchTerm.length > 0) {
          props.doSearch();
          props.setSearchTerm("");
          document.getElementById("target-input").value = "";
        }
      }}
    >
      <Form.Group>
        <Form.Label>Search for a wikipedia article</Form.Label>
        <Form.Control
          type="text"
          id="search"
          placeholder="Search term or phrase"
          onChange={(e) => props.setSearchTerm(e.target.value)}
          value={props.searchTerm}
        />
        <Form.Label>Enter a target article</Form.Label>
        <Form.Control
          type="text"
          id="target-input"
          placeholder="Target article (must be a real article!)"
          onChange={(e) => props.setTarget(e.target.value)}
        />
      </Form.Group>
      <ButtonGroup>
        <Button type={"submit"}>Go</Button>
      </ButtonGroup>
    </Form>
  );
}
export default SearchField;
