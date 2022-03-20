import { Card, Button } from "react-bootstrap";
import { BaseConfig } from "../../Config/BaseConfig";
import { useHistory} from 'react-router-dom';

export const BlogCard = ({item, width}) => {
    const history = useHistory();
  return (
    <Card style={{ width: width, marginTop: 20 }}>
      <Card.Img height={200} variant="top" src={item.path?BaseConfig.api.resource(item.path):"/placeholder.png"} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button onClick={()=>history.push(`/blog/${item.id}`)} variant="primary">Details</Button>
      </Card.Body>
    </Card>
  );
};
