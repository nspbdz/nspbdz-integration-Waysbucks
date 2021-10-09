import { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
const ModalCancelTransaction = (props) => {
  const { handleClose, show } = props;

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Body>
        <p> Transaction Has Successfully Updated</p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCancelTransaction;
