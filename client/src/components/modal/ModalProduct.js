import { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "../../styles/customStyle.css";

import { IoAlertCircleSharp } from "react-icons/io5";
const ModalProduct = (props) => {
  const { handleClose, show, setConfirm } = props;

  const handleConfirm = () => {
    setConfirm(true)
  }



  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div id="wrapModalTransaction">
          <div style={{ fontSize: '20px', fontWeight: '900' }}>
            Add
          </div>
          <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
            Are you sure you want Add ?
                </div>
          <div id="wrapIcon">
            <IoAlertCircleSharp id="styleAlartIcon" />
          </div>
          <div className="text-end mt-5">
            <Button onClick={handleConfirm} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes</Button>
            <Button onClick={handleClose} size="sm" className="btn-danger" style={{ width: '135px' }}>No</Button>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProduct;
