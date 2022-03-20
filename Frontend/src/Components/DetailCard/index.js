import { Button, Card, Container } from "react-bootstrap";
import { BaseConfig } from "../../Config/BaseConfig";
import Service from "../../Services";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export const DetailCard = ({ item, onDelete, onEdit }) => {
  const user = BaseConfig.utilities.getUser();
  return (
    <Card
      style={{
        width: "60%",
        marginTop: 50,
        paddingTop: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      {item.userId === user.id && (
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Button
            onClick={() => onEdit()}
            style={{ marginRight: 10, padding: 4, width: 60 }}
            variant="outline-secondary"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete()}
            style={{ padding: 4, width: 60 }}
            variant="outline-danger"
          >
            Delete
          </Button>
        </div>
      )}

      <Card.Img
        variant="top"
        style={{ width: "80%" }}
        src={item.path?BaseConfig.api.resource(item.path):"/placeholder.png"}
      />
      <Card.Body style={{ width: "100%" }}>
        <Container>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Card.Title style={{ fontSize: 32 }}>{item.title}</Card.Title>
            <Card.Text
              style={{
                fontSize: 12,
                alignSelf: "flex-end",
                color: "grey",
              }}
            >
              Last updated: {new Date(item.updatedDate).toDateString()}
            </Card.Text>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Card.Text style={{ alignSelf: "flex-start", margin: 0 }}>
                <b>Author:</b> {item.userName}
              </Card.Text>
              <Card.Text style={{ alignSelf: "flex-start" }}>
                <b>Category:</b> {item.category}
              </Card.Text>
            </div>

            <Card.Text style={{ fontSize: 12, color: "grey" }}>
              Viewed by: {item.viewedBy} people
            </Card.Text>
          </div>
        </Container>
        <div style={{ paddingTop: 20 }}>
          <Card.Text>{item.description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};
