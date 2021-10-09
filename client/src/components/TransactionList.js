
import { Button, Col, Row, Table } from "react-bootstrap";
// import TransactionItem from "./TransactionItem";
import { BiCheckCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import not_found from "../assets/images/not_found.svg";
import { useState, useContext, useEffect } from "react";
import dataTransactions from "../data/transaction.json"
import "../styles/customStyle.css"
import { API } from "../config/api";
import ModalUpdateTransaction from "./modal/ModalUpdateTransaction"
import ModalUpdateCancelTransaction from "./modal/ModalUpdateCancelTransaction"

import { useHistory } from "react-router";


const TransactionList = ({ data, loading }) => {
  let history = useHistory();

  data = data?.transactions
  console.log(data)

  const [confirmApprove, setConfirmApprove] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [idData, setIdData] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCancel, setShowCancel] = useState(false);
  const handleCloseCancel = () => setShowCancel(false);
  const handleShowCancel = () => setShowCancel(true);


// console.log(confirm)
  const handleApproveConfirm = async (id) => {
    console.log(id)
    setIdData(id)
      handleShow();
  }

  const handleCancelConfirm = async (id) => {
    console.log(id)
    setIdData(id)
    handleShowCancel();
  }
  

  const approveStatus = async () => {
    console.log(idData)
    try {
      const transactions = {
        status: "On The Way",
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

  const CancelStatus = async () => {
    try {
      const transactions = {
        status: "Cancel",
      }
      // Insert product data
      const response = await API.put(`/transaction/${idData}`, transactions);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //approve
    if (confirmApprove) {
      approveStatus();
      console.log("confirms")
      handleClose();
      history.push("/");
      // setConfirm(null);
    }
    //cancel
    if (confirmCancel) {
      CancelStatus();
      console.log("confirms")
      handleCloseCancel();
      history.push("/");
    }
  }, [confirmApprove,confirmCancel]);

  

  return (

    <>
      <Row>
        <Col sm={12} >
          
          <Table striped bordered hover style={{ width: "1100px" }} >
            <thead style={{ backgroundColor: "#E5E5E5" }}>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Income</th>
                <th> Status </th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            {data?.length <= 0 && (
              <img src={not_found} width="100%" height="100%" alt="not found" />
            )}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <tbody style={{ backgroundColor: "#FFFFFF" }} key={index}>

                  <tr id="TableStyle" >
                    <td value={item.id}> {item.id}</td>
                    <td> <p className="tableVal"> {item.name}</p> </td>
                    <td> <p className="tableVal"> {item.address}</p> </td>
                    <td> <p className="tableVal"> {item.postCode}</p> </td>
                    {/* <td> kopi {item.order.name}</td> */}
                    <td> <p id="incomeStyle"> {item.total}</p></td>
                    <td><p className={item.status === "Success" ? "success" : null || item.status === "Cancel" ? "Cancel" : null || item.status === "Waiting Approve" ? "Waiting" : null || item.status === "On The Way" ? "onTheWay" : null}>
                      {item.status}</p>         </td>
                    {item.status == "Waiting Approve" ?
                      <td  >
                        <Row>
                          <Col sm="6"> <Button id="btnUpdate" variant="danger" onClick={() => handleCancelConfirm(item.id)}>
                            <p id="btnText">Cancel</p>
                          </Button></Col>
                          <Col sm="5">  <Button id="btnUpdate" variant="success" onClick={() => handleApproveConfirm(item.id)}>
                            <p id="btnText">Approve</p>
                          </Button></Col>
                          <Col sm="1"></Col>
                        </Row>


                      </td>
                      : null
                    }
                    {item.status == "Cancel" ?
                      <td  >

                        <ImCross id="iconStatusCross" />
                      </td>
                      : null
                    }
                    {item.status == "Success" ?
                      <td  >
                        <BiCheckCircle id="iconStatus" />

                      </td>
                      : null
                    }
                    {item.status == "On The Way" ?
                      <td  >

                        <BiCheckCircle id="iconStatus" />

                      </td>
                      : null
                    }
                    {item.status == "Completed" ?
                      <td  >
                        <Col sm="5"> 
                         <Button variant="success" >
                          Completed
                          </Button>
                          </Col>

                      </td>
                      : null
                    }

                  </tr>

                </tbody>

              ))}
          </Table>
          <ModalUpdateTransaction 
          setConfirmApprove={setConfirmApprove}
          show={show}
          handleClose={handleClose}

          handleApproveConfirm={handleApproveConfirm}
            />
          <ModalUpdateCancelTransaction 
          setConfirmCancel={setConfirmCancel}
          show={showCancel}
          handleCloseCancel={handleCloseCancel}
          handleCancelConfirm={handleCancelConfirm}
            />
        </Col>
      </Row>
    </>

  )
}
export default TransactionList;