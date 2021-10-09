import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddProductForm from "../components/form/AddProductForm";
import data from "../data/product.json";

function AddProduct(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddProductForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddProduct;
