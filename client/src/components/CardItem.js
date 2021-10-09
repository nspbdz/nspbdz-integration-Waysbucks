import { useHistory } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";

function CardItem({ item, isProduct, handleClick }) {
  const router = useHistory();
  const [show, setshow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  // console.log(state)
  // useEffect(() => {
  //   if (!state.isLogin) {
  //     setshow(true);
  //   }
  //   return () => {
  //     setshow(false)
  //   }
  // }, [state])

  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handlePushToDetail = (id) => {
    // console.log(id);
    router.push(`product/${id}`);
  };
  return (
    <>
      <>
        <Row>
          <Col key={item.id} id={item.id} >
            <Card data-div_id={item.id} id={item.id} style={{ width: "15rem", marginBottom: "10px" }}>
              <div class="containerss">
                <Card.Img variant="top" src={item.image} width={241} height={321} style={{ objectFit: "cover", borderRadius: "10px", border: "none", }} />
                {state.isLogin == true ?
                
                  <Button id="btnCard" onClick={() => handlePushToDetail(item.id)} class="btns">Order Now</Button >
                  :
                  <Button id="btnCard" onClick={() => setshow(true)} class="btns">Order Now</Button>
                }

              </div>
              <Card.Body id="cardBody" style={{ backgroundColor: "#F6E6DA" }}>
                <Card.Title id="cardTitle" >  {item.title} </Card.Title>
                <br></br>
                <Card.Title id="cardPrice">Rp.{item.price} </Card.Title>
              </Card.Body>
              <ModalSignin show={show} handleClose={() => setshow(false)} />
            </Card>

          </Col>
        </Row>
      </>


    </>
  );
}

export default CardItem;
