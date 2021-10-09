import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Badge, Button, FormControl, InputGroup, Form, Navbar, Nav, } from "react-bootstrap";
import shopcart from "../assets/images/shopcart.svg";
import { UserContext } from "../context/userContext";
// import { CartContext } from "../contexts/cartContext";
import ModalSignin from "./modal/ModalSignin";
import ModalSignup from "./modal/ModalSignup";
import Icon from "../assets/images/brand-icon.svg";
import UserDropdown from "./dropdown/UserDropdown"
import AdminDropdown from "./dropdown/AdminDropdown"
import data from "../data/fakeData";
import "../styles/customStyle.css";
import { API } from "../config/api";

const Header = () => {
  const WAIT_TIME = 5000; // waktu re render

  // const [showSignin, setshowSignin] = useState(false);
  const [showSignup, setshowSignup] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setshow] = useState(false);
  // console.log("user context state", state)
  // console.log("user id ", state.user.listAs)

  useEffect(() => {
    if (!state.isLogin) {
      setshow(true);
    }
    return () => {
      setshow(false)
    }
  }, [state])

  const router = useHistory();
  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" })
  };
  // console.log(state.user.listAs)
// var caaart="";
  const getCarts = async () => {
    try {
      const response = await API.get("/carts");
      // Store product data to useState variabel
      console.log(response)
      setCarts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCarts();
  }, []);
// console.log(caaart)
  // useEffect(async () => {
  //   let data = await getCarts();
  //   setCarts(data);
  // }, []);

  // console.log("dataCart", carts?.userCarts?.length)
  // carts?.userCarts?.length
  // useEffect(() => {
  //   if(carts.userCarts){
  //     console.log("baru")
  //     setCarts(carts)
  //   }
  // },[carts]);
  console.log("dataCart", carts)
  console.log("state", state)


  // useEffect(() => { //re render every WAIT_TIME
  //   const id = setInterval(() => {
  //     getCarts();
    
  //   }, WAIT_TIME);
  //   return () => clearInterval(id);
  // }, []); 

  const getUser = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      // console.log(response)
      setUser(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => { //re render every WAIT_TIME
  //   const id = setInterval(() => {
  //     getUser();
  //   // console.log(user)
  //   }, WAIT_TIME);
  //   return () => clearInterval(id);
  // }, []); 
  
  const ClickHereLogin =() =>{
    setshow(false)
    setshowSignup(true)
  }
  
  const ClickHereRegister =() =>{
    setshowSignup(false)
    setshow(true)
  }
  
  
  return (

    <Navbar expand="lg">

      <Link to="/" className="navbar-brand" id="logo">
        <img src={Icon} alt="brand" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        {/* <AdminDropdown /> */}

        {state.isLogin == true && state.user.listAs == 1 && (

          <>
            <Row>
              <Col sm="2" className="navbarDropdown">
              </Col>
              <Col sm="5">
                <AdminDropdown data={user} />
              </Col>
              <Col sm="5"></Col>
            </Row>
          </>
        )}
        {state.isLogin == true && state.user.listAs == 2 && (

          <>
            <div id="cartWrap">
              <Link to="/cart" >
                <img src={shopcart} className="shopCart" /> {' '}
                <Badge id="badgeCart"  >   <p id="badges"> {carts?.userCarts?.length }</p> </Badge>
              </Link>
            </div>
            <div id="userDropd">
              {/* <p>ansdkaskd</p> */}
              <UserDropdown data={user} />
            </div>
          </>
        )}
        {!state.isLogin && (
          <>
            <div id="wrapBtnSign">
              <button id="btnLogin" className="my-2" onClick={() => setshow(true)} >
                <p id="textBtnLogin"> Login</p>
             </button>
            </div>
            <Button id="btnRegister" className="mr-3 my-2" onClick={() => setshowSignup(true)}   >
              <p id="textBtnRegister"> Register</p>

          </Button>
            <ModalSignin ClickHereLogin={ClickHereLogin} show={show} handleClose={() => setshow(false)} handleLogin={dispatch} />

            <ModalSignup
              showSignup={showSignup}
              ClickHereRegister={ClickHereRegister}
              handleClose={() => setshowSignup(false)}
            />
          </>
        )}
      </Navbar.Collapse>
    </Navbar>

  );
};


export default Header;
