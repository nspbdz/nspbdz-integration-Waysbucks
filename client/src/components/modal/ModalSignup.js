import { Modal, Button, Row, Col, Form } from "react-bootstrap";
  
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { API } from "../../config/api";

const ModalSignin = (props) => {
  const { handleClose, handleLogin,ClickHereRegister, showSignup } = props;
  
  let history = useHistory();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    listAs: "",
  });
  const { email, password } = form;
  const [message, setMessage] = useState(null)
  // set state message berupa null
  
  const [state, dispatch] = useContext(UserContext);
  
  const handleChange = (e) => {
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/register", body, config);
      // Checking process
      // status: "success..."

      // console.log(response.data)
      if(response.data.status ==="success..."){
        // console.log("berhasil")
        const alert =(
          <Alert variant="success" className="py-1">
            Register berhasil, Silahkan Login
          </Alert>
        );
        setMessage(alert)
      }


      // set message jika berhasil
      
    } catch (error) {
      // set message jika gagal
      const alert =(
        <Alert variant="danger" className="py-1">
          Email Already Registered / Password Incorrect
        </Alert>
      );
      setMessage(alert)
      console.log(error)
      
    }
  };


  return (
    <Modal show={showSignup} onHide={handleClose} centered>
      <Modal.Body>
      {/* pemanggilan message */}
      {message && message}

        <Form onSubmit={handleSubmit} style={{ paddingLeft: "33px", paddingRight: "33px", }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h3 style={{ color: "#BD0707", paddingTop: "20px", paddingBottom: "29px" }} > Register</h3>
            <Form.Control id="formProduct"
              type="email"
              name="email"
              // value={data.email}
              onChange={handleChange}
              placeholder="email"
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control id="formProduct"
              type="password"
              name="password"
              // value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control id="formProduct"
              type="text"
              name="fullName"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Full Name"
            />
              <Form.Group className="mb-3" controlId="formBasicListas">
              <Form.Label>As </Form.Label>
              
              <Form.Control id="formProduct" 
              type="text" 
              name="listAs" 
              // value={data.listAs}
              onChange={handleChange}
              placeholder="owner / user" />
            </Form.Group>

          </Form.Group>
          <Button  id="modalBtn" type="submit">
            Register
          </Button>
          <p>Already have an account ? Click <span onClick={ClickHereRegister}> Here</span></p>
        </Form>



      </Modal.Body>
    </Modal>

  );
};

export default ModalSignin;
