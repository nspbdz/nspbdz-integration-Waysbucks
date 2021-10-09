import { useState, useContext, useEffect } from "react";
import { Row, Col, Alert, Form, Container, Button, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useHistory, Router, Link } from "react-router-dom";
import data from "../../data/toping.json";
import topingadd from "../../assets/images/toping/topingadd.svg";
import "../../styles/customStyle.css";
import { CgAttachment } from "react-icons/cg";

import ModalToping from "../modal/ModalToping"
import { API } from "../../config/api";

function AddTopingForm() {
  let history = useHistory();
  const [message, setMessage] = useState(null);

  const [confirm, setConfirm] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    image: null,
    title: "",
    price: "",
  }); //Store product data

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (form.image == null) {
      const alert = (
        <Alert variant="success" className="py-1">
          Attachment Harus Di isi
        </Alert>
      );
      setMessage(alert);
    } else {
      setMessage("")
    }

  }
  console.log(form)
  const handleOnSubmit = async () => {
    try {
      // e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.append("image", form.image, form.image.name);
      formData.set("title", form.title);
      formData.set("price", form.price);
      // console.log(form);

      // Insert toping data
      const response = await API.post("/toping", formData, config);
      console.log(response);
      // setshow(true)

      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (form.image !== null) {
      handleShow();
    }
  }
  useEffect(() => {

    if (confirm) {
      handleOnSubmit();
      console.log("confirms")
      handleClose();
      history.push("/");
    }
  }, [confirm]);

  return (
    <div>
      <>
        <h4 id="TextProduct" > Toping</h4>
        <Row>
          <Col sm={6} id="topStyle">
            <Form className="formStyle" style={{ marginTop: "40px", marginLeft: "30px" }} onSubmit={handleConfirm}>
              <Form.Group>
                <Form.Control id="formProducts"
                  name="title"
                  type="text"
                  required
                  placeholder="Name Product"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control id="formProducts"
                  name="price"
                  type="text"
                  required
                  placeholder="Price"
                  onChange={handleChange}
                />
              </Form.Group>

              <label for="file-uploadss" id="photoLabel" >
                {message && message}

                <InputGroup >
                <FormControl disabled id="ProductPhotoWrap" placeholder="Photo Product" />
                  <InputGroup.Text id="ProductPhoto" className="photo" >
                    <CgAttachment />
                  </InputGroup.Text>
                </InputGroup>
              </label>
              <input id="file-uploadss" className="files" name="image" type="file"
                onChange={handleChange}
              />

              <Row>
                <Col sm="4">
                  <div id="btnAddWrap" >
                    <Button id="btnAdd" type="submit"  >
                      Add Product
                      </Button>
                  </div>
                </Col>
                <ModalToping
                  setConfirm={setConfirm}
                  show={show}
                  handleClose={handleClose}
                />

                <Col sm="4"></Col>
              </Row>
            </Form>
          </Col>
          <Col sm={1}>
          </Col>

          <Col sm={5}>
            {
              form?.image == null ?
                <img src={topingadd} id="productForms" />
                :
                <img src={URL.createObjectURL(form?.image)} id="productFormChange" />

            }
          </Col>
        </Row>

      </>


    </div>
  )
}

export default AddTopingForm;
