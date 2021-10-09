import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { Button, Alert, Card, Col, Row, Form, Container } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import imgFilebtn from "../assets/images/imgFilebtn.svg"
import ModalTransaction from "../components/modal/ModalTransaction"
import TransactionForm from "../components/TransactionForm"
import TransactionOrder from "../components/TransactionOrder"
import { useHistory } from "react-router";

import { API } from "../config/api";
function Cart({ Dataform }) {
  let history = useHistory();

  const [message, setMessage] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCarts = async () => {
    try {
      const response = await API.get("/carts");
      // Store product data to useState variabel
      // console.log(response)
      setCarts(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  //   const [dataForm] = useState("");
  const [post, setFormData] = useState({
    post: {
      name: "",
      email: "",
      Phone: "",
      status: "",
      postCode: "",
      address: "",
      image: null,
    }
  });
  console.log(post)
  console.log(post.post.image)



  // console.log("dataCart", carts?.userCarts)
  const userCartsLength = carts?.userCarts?.length
  // console.log(userCartsLength)
  var totals = []
  var jumlahtotal = []
  var quantity = []
  var jumlahQuantity = []

  for (var i = 0; i < userCartsLength; i++) {
    totals.push(carts?.userCarts[i].subtotal)
    quantity.push(carts?.userCarts[i].qty)
    if (totals.length == 1) {
      jumlahtotal = totals
      jumlahQuantity = quantity
    }
    if (totals.length > 1) {
      console.log(" =1")
      jumlahtotal = totals.reduce((val, nilaiTotals) => {
        return val + nilaiTotals
      })
      jumlahQuantity = quantity.reduce((val, nilaiQty) => {
        return val + nilaiQty
      })
    }
    jumlahtotal = [jumlahtotal]
    jumlahQuantity = [jumlahQuantity]

  }

  
  const handleChange = e => {

    const { name, value, type } = e.target;
    setFormData(prevState => ({
      post: {
        ...prevState.post, [name]:
          type === "file" ? e.target.files[0] : value
      }

    }));
    console.log(post.image)
    if (post.image == undefined) {
      const alert = (
        <Alert variant="success" className="py-1">
          Attachment Harus Di isi
        </Alert>
      );
      setMessage(alert);
    } else {
      setMessage("")
    }

  };
  const handleSubmitConfirm = async (e) => {
    e.preventDefault();
    // setshow(true)
    if (post.post.image !== null) {
      handleShow();
    }
  }
  console.log(confirm)

  // console.log(post.post.image)
  const handleCreateTransaction = async (e) => {
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
      formData.append("image", post.post.image, post.post.image.name);
      formData.set("name", post.post.name);
      formData.set("email", post.post.email);
      formData.set("phone", post.post.phone);
      formData.set("postCode", post.post.postCode);
      formData.set("address", post.post.address);
      formData.set("status", "Waiting Approve");
      formData.set("total", jumlahtotal);

      console.log(formData);
      // Insert product data
      const response = await API.post("/transaction", formData, config);
      console.log(response);
      // history.push("/");
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {

    if (confirm) {
      handleCreateTransaction();
      console.log("confirms")
      handleClose();
      history.push("/profile");
      // setConfirm(null);
    }
  }, [confirm]);

  

  return (
    <div>
      {carts?.userCarts?.length < 1 && (<p className="h1">Your cart is empty</p>)}
      {carts?.userCarts?.length > 0 && (
        <Container>
          <Row id="cartList">
            <Col sm="6" >
              <h4 id="myCart" > My Cart</h4>
              <p id="reviewCart" >Review Your Order</p>
              <hr></hr>
              <ModalTransaction
                setConfirm={setConfirm}
                show={show}
                handleClose={handleClose}
              />
 
              <TransactionOrder
                message={message}
                handleChange={handleChange}
                post={setFormData}
                ImgPost={post.post.image}
                carts={carts}
                jumlahtotal={jumlahtotal}
                jumlahQuantity={jumlahQuantity}

              />
            </Col>
            <Col sm="1">
            </Col>
            <Col sm="5" id="CartCol">
              <TransactionForm
                handleChange={handleChange}
                post={setFormData}
                handleSubmitConfirm={handleSubmitConfirm} />


            </Col>
          </Row>
        </Container>
      )}
    </div>

  )

}

export default Cart
