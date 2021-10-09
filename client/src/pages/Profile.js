import { Card, Jumbotron, Row, Col, Button, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import ProfileList from "../components/ProfileList";
import OrderList from "../components/OrderList";
import "../styles/customStyle.css";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import ModalUpdateProfile from "../components/modal/ModalUpdateProfile"
function Profile() {
  const [show, setshow] = useState(false);

  const { state, dispatch } = useContext(UserContext);
  // console.log(dataTransaction)
  
  const [dataUser, setDataUser] = useState([]);
  console.log(state)

  const [order, setOrder] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyTansactions = async () => {
    try {
      const response = await API.get("/mytransaction");
      // Store product data to useState variabel
      setTransactions(response.data.data.transactions);
      setOrder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyTansactions();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  // useEffect(async () => {
  //   let data = await getProducts();
  //   setProducts(data);
  // }, []);
  
  // useEffect(() => {
  //   if(order?.transactions)
  // }, [order]);
// console.log(order.transactions)  
  
  console.log(transactions)
  console.log(transactions.length)
  var orderData = []
  for (var i = 0; i < transactions.length; i++) {
    orderData.push(transactions[i])

  }
  console.log(dataUser)
  console.log(order)


  return (
    <div>
      <>
        <div>
          <Row >
            <Col sm="1"></Col>
            <Col >
              <>
                <ProfileList data={dataUser} />
                <div style={{ marginTop: "10px" }}>
                  {/* <Form
                  //   onSubmit={handleSubmit} 
                  >
                    <Form.Group>
                      <Form.Control
                        name="imageFile"
                        type="file"
                        //   onChange={handleChange}
                        required
                      />
                    </Form.Group> */}

                    <Button id="updateProfile"  onClick={() => setshow(true)} >
                      update profile
                  </Button>
                  <ModalUpdateProfile show={show} handleClose={() => setshow(false)}  />


                  {/* </Form> */}
                </div>
              </>

            </Col>
            <Col xs={1}></Col>
            <Col xs={5}  >
              <>
                <h4 id="myTransaction" >My Transaction</h4>

                <OrderList data={order} />
              </>
            </Col>

            <Col sm="1"></Col>

          </Row>
        </div>

      </>

    </div>
  )
}

export default Profile
