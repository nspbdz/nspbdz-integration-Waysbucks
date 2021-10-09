import { Col, Row } from "react-bootstrap";
import CardItem from "./CardItem";

const CardList = ({ data, product, handleAddProduct }) => {
  return (
    <Row  >
      {data.map((item, index) => (
        <Col key={index} >
          <CardItem item={item} isProduct={product} handleClick={handleAddProduct} />
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
