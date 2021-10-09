import React from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useContext, useState, useEffect, useCallback } from 'react';
import ModalTransaction from "../components/modal/ModalTransaction"


function TransactionForm({ handleChange, post, handleSubmitConfirm, }) {
  const [show, setshow] = useState(false);


  return (
    <div id="cartOrder" >
      <Form onSubmit={(e) => handleSubmitConfirm(e)}>

        <Form.Group>
          <Form.Control id="formProduct"
            name="name"
            type="text"

            required
            placeholder="Name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control id="formProduct"
            name="email"
            type="text"
            required
            placeholder="email "
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control id="formProduct"
            name="phone"
            type="number"
            required
            placeholder=" Phone"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control id="formProduct"
            name="postCode"
            type="number"
            required
            placeholder="postCode"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control id="formProduct"
            as="textarea"
            name="address"
            type="text"
            placeholder="address"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Button id="payBtn" type="submmit">Pay</Button>
        {/* <Button onClick={handleSubmit} id="payBtn" >Pay</Button> */}
        {/* <ModalTransaction show={show} handleClose={() => setshow(false)} /> */}

      </Form>
    </div>
  )
}

export default TransactionForm
