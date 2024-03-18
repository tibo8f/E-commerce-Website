"use client";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

type NProp = {
  title: String;
  content: String;
  price: number;
  user: String;
};

function CardArticle(props: NProp) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="@/app//images/chaussuredessin.jpeg" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <Card.Text>{props.user}</Card.Text>
        <Button variant="primary">{props.price}€</Button>
      </Card.Body>
    </Card>
  );
}

export default CardArticle;
