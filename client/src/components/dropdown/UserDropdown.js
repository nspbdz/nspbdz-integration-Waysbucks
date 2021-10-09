import { React } from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BsCalendar } from 'react-icons/bs';
import IconUser from "../../assets/images/IconUser.svg"
import Logout from "../../assets/images/logout.svg"
import { Dropdown } from "react-bootstrap"
import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext";
import userData from "../../data/User";
import { Card, Jumbotron, Row, Col, Button, DropdownButton, Image } from "react-bootstrap";
import { BsPeopleCircle, BsEnvelope, BsLock, BsFillHouseFill, BsGeoAlt } from 'react-icons/bs';
import { BiReceipt } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { setAuthToken } from "../../config/api";
import Triangle from "../../assets/images/triangle.svg"
function UserDropdown(data) {
  const [state, dispatch] = useContext(UserContext);
  // console.log(data.data.image)
  data=data.data
  // console.log(data)

// console.log(state.user.image)
  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    setAuthToken();
  };  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  // const userFilter = userData.filter(item => ( item.username === userlogin ));


  return (
    <>
      <div>

        <Dropdown align="start">
          <Dropdown.Toggle variant=" btn-sm "  style={{ backgroundColor: "transparent", border: 'none' }} id="dropdown-basic" >
          
            {data.image !== "http://localhost:5000/uploads/null" ?
            
            <Image id="avatarStyle" src={data.image} roundedCircle />
            :
            <Image id="avatarStyle" src="https://ujhw03sswsepgw3234x0qm51-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/171025-202659-Donnely-Christopher-400x400x72.jpg" roundedCircle />
            }
          
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ width: "220px" ,marginTop:"10px" }}>
        
          <div id="imgTriangle"></div>
            <Dropdown.Item >

              <Row>
                <Col sm="2"> <img src={IconUser} style={{ width: "25px" }} /> </Col>
                <Col sm="2">
                  <Link to="/profile" style={{ backgroundColor: "transparent", color: "black" }} >Profile</Link>

                </Col>
              </Row>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item >
              <Row>
                <Col sm="2">  <img src={Logout}  style={{ width: "35px", height: "25px"}} /> </Col>
                <Col sm="2">
                  <Link to="/" onClick={handleLogout} style={{ backgroundColor: "transparent", color: "black" }} >Logout</Link>
                </Col>
              </Row>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}
export default UserDropdown;