
import { Row, Col, Card, Button } from "react-bootstrap";
import qr from "../assets/images/qr.jpg";
import icon from "../assets/images/brand-icon.svg";
import "../styles/customStyle.css";
import { API } from "../config/api";
import { useState, useContext, useEffect } from "react";
import not_found from "../assets/images/not_found.svg";
import ModalUpdateTransactionUser from "./modal/ModalUpdateTransactionUser"
import ModalDetailTransaction from "./modal/ModalDetailTransaction"
import { useHistory, Router, Link } from "react-router-dom";

const OrderList = ({ data, loading, }) => {
  let history = useHistory();
  const [dataModal, setDataModal] = useState();
  const [idData, setIdData] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  const nowss = new Date().toLocaleTimeString("en-US", { month: "long", day: "2-digit" })
  const transactions = data.transactions
  // console.log(transactions)

  const handleConfirm = async (id) => {
    console.log(id)
    setIdData(id)
    handleShow();
  }
  const updateStatus = async () => {
    try {
      const transactions = {
        status: "Success",
      }
      // Insert product data
      const response = await API.put(`/transaction/${idData}`, transactions);
      console.log(response);
      // setshow(true)
      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };


  const detailTransaction = async (id) => {
    console.log(id)
    try {
      const response = await API.get(`/transaction/${id}`);
      console.log(response.data)
      // Store product data to useState variabel
      setDataModal(response.data.data);
      handleShowDetail();

    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataModal)
  useEffect(() => {
    if (confirm) {
      updateStatus();
      console.log("confirms")
      handleClose();
      history.push("/");
    }
  }, [confirm]);

  return (
    // <p>asmdnsadn</p>
    <>
      {transactions?.length <= 0 && (
        <p>data tidak ada</p>
        // <img src={not_found} width="100%" height="100%" alt="not found" />
      )}

      <div id="wraperprofiles">

        {transactions?.map((item, index) => (
          <div id="wraperprofile">
            <Row style={{ marginTop: "10px" }} >
              {/* <div id="profileOrderStyle"> */}
              <Col sm="7" >

                {item.order.slice(0, 2).map((orders, index) => (

                  <Row>
                    <Col key={item.id} sm="4" id="colOrder" >
                      <img src={orders.product.image} style={{ width: "80px", height: "97px", marginTop: "14px", marginLeft: "28px", objectFit: "cover", borderRadius: "10px" }} />
                    </Col>
                    <Col sm="8">
                      <h5 id="MyTransactionname" className="h4 font-weight-bold" >{item.order.name}</h5>
                      <p id="date">{nowss}</p>
                      {/* diberi class name p margin 0 margin-bottom 0  */}
                      <span id="MyTransactionText">Toping : &nbsp;
                        {orders.toping.map((items) => (
                        <div id="Mytoping" >
                          <span> {items.title + ","} </span>
                        </div>
                      ))}
                      </span>
                      <br></br>
                      <span id="MyTransactionText" >Price : Rp.{orders.subtotal}</span>
                      <br></br>
                    </Col>
                  </Row>
                ))}

              </Col>
              <Col sm="4" >

                <div style={{ alignItems: "center" }}>
                  <img src={icon} id="iconprofile" />
                  <img src={qr} id="qr" />

                  {item?.status === "On The Way" ?
                    <Button id="btnStatus" variant="info" onClick={() => handleConfirm(item.id)} >
                      <p id="statustext">  {item.status} </p>
                    </Button>
                    :
                    <Button variant="info" id={item?.status == "Waiting Approve" ? "waitingsBtn" : null || item.status === "Success" ? "successBtn" : null || item.status === "Cancel" ? "cancelBtn" : null}>
                      <p id={item?.status == "Waiting Approve" ? "waitings" : null || item.status === "Success" ? "succes" : null || item.status === "Cancel" ? "cancels" : null}>  {item.status} </p>
                    </Button>
                  }
                  <br></br>
                  <p id="subtotaltext">Total: {item.total}</p>
                </div>
 
              </Col>
              <span id="DetailTransactionStyle" onClick={() => { detailTransaction(item.id); }} > To Other Item</span>

            </Row>
          </div>
        ))}
        <ModalDetailTransaction
          dataModal={dataModal}
          show={showDetail}
          handleCloseDetail={handleCloseDetail}
        />
        <ModalUpdateTransactionUser
          setConfirm={setConfirm}
          show={show}
          handleClose={handleClose}
        />
      </div>

    </>
  );
};

export default OrderList;
