import React from 'react'
import { Button, Card, Col, Row, Form, Container } from 'react-bootstrap';
import { API } from "../config/api";
import { useContext, useState, useEffect } from 'react';
import { BsTrash } from "react-icons/bs";
import imgFilebtn from "../assets/images/imgFilebtn.svg"
import Attach from "../assets/images/attach.svg"

function TransactionOrder({ handleChange, post, jumlahtotal, ImgPost, jumlahQuantity, carts, message }) {
  console.log(ImgPost)
  return (
    <div>
      {/* {carts?.userCarts?.length < 1 && (<p className="h1">Your cart is empty</p>)}
      {carts?.userCarts?.length > 0 && ( */}

      {carts?.userCarts?.map((item) => (

        <div id="cartOrder" >
          <Row >
            <Col md="2">
              <img
                variant="top"
                src={item.product.image}
                height={80}
                width={80}
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col md="6" style={{ marginTop: "10px" }}>
              <p className="productName"> {item.product.title}</p>

              <p id="topingText"> Toping :
                  {item.toping.map((items) => (
                <div id="Mytopings" >
                  <p> {items.title + ","} </p>
                </div>
              ))}
              </p>
            </Col>
            <Col md="2" style={{ marginTop: "10px" }}>
              <div className="productPrice" id={"demo" + item.id} value={item.subtotal}  >
                <p>  Rp.{item.subtotal} </p>
                {/* <p onClick={() => handleClick(item, "REMOVE_CART")} id="trashIcon" ><BsTrash /> </p> */}
              </div>
              <div id="trashIconWrap">
                <BsTrash id="trashIcon" />
              </div>

            </Col>

          </Row>
        </div>
      ))}

      <hr></hr>
      <div id="cartOrder" >

        <Row>
          <Col sm="6">
            <hr></hr>
            <Row>
              <Col sm="6">
                <p id="subTotalProduct">Sub Total</p>
                <p id="subTotalProduct">Qty</p>

              </Col>
              <Col sm="1">
              </Col>
              <Col sm="4">
                <div id="totalPrice">
                  <p id="jumlahTotalStyle" >{jumlahtotal}</p>
                  <p id="jumlahQtyStyle" >{jumlahQuantity}</p>
                </div>


              </Col>
            </Row>
            <hr></hr>
            <Row>

              <Col sm="4">
                <p id="totalPrice" >Total</p>

              </Col>
              <Col sm="4"></Col>
              <Col sm="4">
                <p id="totalPrice">{jumlahtotal}</p>
              </Col>
            </Row>

          </Col>

          <Col sm="4">
            <label for="file-upload" class="custom-file-upload">
              {ImgPost ?
                <div id="WraptextAttach" >
                    <img src={URL.createObjectURL(ImgPost)} id="cartAttach" /> <br></br>
                    <span id="textAttachCart">
                      Attache of Transaction
                  </span>
                </div>
                :
                <>
                  {message && message}

                  <div id="WraptextAttach" >
                    <img src={Attach} id="cartAttachNone" /> <br></br>
                    <div id="textAttachCartWrap">
                    <span id="textAttachCart">
                      Attache of Transaction
                  </span>
                    </div>
                   
                  </div>
                </>

              }
            </label>

            <input id="file-upload" className="files" name="image" type="file" required
              onChange={handleChange}
            />
          </Col>
        </Row>
      </div>
      {/* )} */}

    </div>
  )
}

export default TransactionOrder
