import { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";
import AddTopingForm from "../components/form/AddTopingForm";
// import ProductDetailItem from "../components/ProductDetailItem"
import data from "../data/product.json";

function AddToping(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>

      <Row>
        <Col>
          <AddTopingForm />
        </Col>
      </Row >
    </div >
  );
}

export default AddToping;
