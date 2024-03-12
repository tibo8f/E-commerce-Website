"use client";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardArticle() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="@/app//images/chaussuredessin.jpeg" />
      <Card.Body>
        <Card.Title>Chaussure</Card.Title>
        <Card.Text>La meilleure chaussure du marché !</Card.Text>
        <Button variant="primary">23$</Button>
      </Card.Body>
    </Card>
  );
}

export default CardArticle;
