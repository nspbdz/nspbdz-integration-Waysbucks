import { useState, useEffect } from "react";
import { Modal, Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { API } from "../../config/api";
import ModalProduct from "./ModalTransaction";
// import { useState, useContext,  } from "react";
import "../../styles/customStyle.css";
import ModalShowAttach from "./ModalShowAttach";

const ModalDetailTransaction = (props) => {
  const { handleCloseDetail, show, dataModal } = props;
  const dataTransaction = dataModal?.transactions
  console.log(dataTransaction)
  // console.log(dataModal)
  const [shows, setShows] = useState(false);
  const handleClosed = () => setShows(false);
  const handleShows = () => setShows(true);

  const handleAttachClick = () => {
    handleShows()
    console.log("kliks")
  }

  return (
    <div>
      {dataModal == undefined && (null)}
      {dataModal !== undefined && (

        <Modal className="my-modal" show={show} onHide={handleCloseDetail} centered>
          <Modal.Body>
            <div>
              <span id="titleDetail"> Detail Data Of Transaction</span>
            </div>

          <hr></hr>
            <Container>
              <Row>

                <Col sm="4">
                  <div id="wrapModalOrderAttachment" onClick={handleAttachClick}>

                    <img src={dataTransaction.attachment} id="modalOrderAttach" ></img>
                  </div>
                </Col>
                <Col sm="8">
                  <div id="textDataTransactions">

                    <span> id <span> :{dataTransaction.id}</span> </span> <br></br>
                    <span> address <span> :{dataTransaction.address}</span> </span> <br></br>
                    <span> name: {dataTransaction.name} </span> <br></br>
                    <span> email: {dataTransaction.email} </span> <br></br>
                    <span> Phone: {dataTransaction.phone} </span> <br></br>
                    <span> address: {dataTransaction.address} </span> <br></br>
                    <span> postCode: {dataTransaction.postCode} </span> <br></br>
                    <span> status: {dataTransaction.status} </span> <br></br>
                    <span> total: {dataTransaction.total} </span> <br></br>
                  </div>
                  {/* <Table>
                    <tr>
                        <td>id</td>
                        <td>:{dataTransaction.id}</td>
                    </tr>
                    <tr>
                        <td>address:</td>
                        <td>:{dataTransaction.address}</td>
                    </tr>
                  </Table> */}
                </Col>
              </Row>
            </Container>
            <hr></hr>
            {dataModal?.orders.map((item, index) => (
              <div>
                <Container>
                  <Row>
                    <Col sm="4">
                      <div id="wrapModalOrderImg">

                        <img src={item.product.image} id="modalOrderImg" ></img>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div >

                        <span id="modalOrderTitle"> {item.product.title} </span>
                        <br></br>
                        <span id="modalOrderText"> {item.product.price} </span>
                        <br></br>

                        <span id="modalOrderToping"> Toping :
                        {item.toping.map((items) => (
                          <div id="Mytopings" >
                            <span> {items.title + ","} </span>
                          </div>
                        ))}
                        </span>
                        <br></br>

                        <span id="modalOrderText"> QTY: {item.qty} </span> <br></br>
                        <span id="modalOrderText"> SubTotal {item.subtotal} </span>
                      </div>

                    </Col>
                  </Row>
                </Container>
              </div>

            ))}
          </Modal.Body>
        </Modal>
      )}
      <ModalShowAttach
        shows={shows}
        handleClosed={handleClosed}
        dataAttach={dataTransaction?.attachment}
      />
    </div>
  );
};

export default ModalDetailTransaction;
