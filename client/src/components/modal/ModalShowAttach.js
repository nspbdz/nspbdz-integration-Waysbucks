import { useState, useEffect } from "react";
import { Modal,Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { API } from "../../config/api";
import ModalProduct from "./ModalTransaction";
// import { useState, useContext,  } from "react";
import "../../styles/customStyle.css";

const ModalShowAttach = (props) => {
  const { handleClosed, shows, dataAttach } = props;
console.log(shows)
 
console.log(dataAttach)
  return (
    <div>
      {dataAttach == undefined && (null)}
      {dataAttach !== undefined && (

        <Modal className="my-modal" show={shows} onHide={handleClosed} centered>
          <Modal.Body>
            <span id="textProof"> Proof Of Payment</span>
           <div id="modalAttachWrap" >
             <img src={dataAttach} id="modalAttach" />
           </div>
          </Modal.Body>
        </Modal>
       )} 
    </div>
  );
};

export default ModalShowAttach;
