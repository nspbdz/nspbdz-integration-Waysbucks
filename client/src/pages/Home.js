import { Row, Col, Container } from "react-bootstrap";

import CardList from "../components/CardList";
import data from "../data/fakeData";
import Jumbotron from "../../src/assets/images/Jumbotron.svg";
import { useState, useContext, useEffect } from "react";
import TransactionList from "../components/TransactionList"
import "../styles/customStyle.css"
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const Home = () => {
  const WAIT_TIME = 5000; // waktu re render
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      // Store product data to useState variabel
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // Store product data to useState variabel
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getTransactions();
  //   // getProducts();

  // }, []);
  // useEffect(() => {
  //   getProducts();

  // }, []);
  
  

  // useEffect(() => {
  //   if(transactions){
  //     // getProducts();
  //     console.log(transactions)
  //   }

  // }, [transactions]);

  useEffect(() => { //re render every WAIT_TIME

    const id = setInterval(() => {
      getProducts();
      getTransactions();
      // console.log(user)
    }, WAIT_TIME);
    return () => clearInterval(id);
  }, []);
  console.log(products);

  return (

    <>
      <Container  >
        {state.isLogin == true && state.user.listAs == 1 && (
          <>
            <h3 className="title">Income Transaction</h3>
            <Row className="justify-content-md-center" >
              <>
                <Col sm="12"  >
                  <TransactionList data={transactions} />
                </Col>
              </>
            </Row>
          </>
        )}
      </Container>
      <Container  >
        <Row >
          {state.isLogin == true && state.user.listAs == 2 && (
            <Col md="auto" >
              <img src={Jumbotron} />
              <p id="letsHome" >Let’s Order</p>
              <CardList data={products} />
            </Col>
          )}
        </Row>
      </Container>
      <Container  >
        <Row className="justify-content-md-center" >
          {!state.isLogin && (
            <Col md="auto" >
              <img src={Jumbotron} />
              <p id="letsHome">Let’s Order</p>
              <CardList data={products} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}
export default Home;
