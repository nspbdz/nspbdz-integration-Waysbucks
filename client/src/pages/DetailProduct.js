import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { Row, Col, Button } from "react-bootstrap";
import dataProduct from "../data/product";
import NotFound from "./NotFound";
import CardList from "../components/CardList";
import { CartContext } from "../contexts/cartContext";
import "../styles/customStyle.css"
import fakecart from "../data/cart.json";
import { API } from "../config/api";


const DetailProduct = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();
  const [pilihToping, setPilihToping] = useState([]);
  const [qty, setQty] = useState(1)
  const [getPrice, setGetPrice] = useState(null);

  const [product, setProduct] = useState({});
  const [dataToping, setDataToping] = useState([]);

   // Fetching detail product data by id from database
  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      // Store product data to useState variabel
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  // console.log(product)

   // Fetching detail product data by id from database
   const getToping = async () => {
    try {
      const response = await API.get("/topings" );
      console.log(response)
      // Store product data to useState variabel
      setDataToping(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToping();
  }, []);
  // console.log(dataToping)x

  const findTopping = (e) => {
    const topingId = parseInt(e.target.value)
    var newArray = [...pilihToping, topingId];
    if (pilihToping.includes(topingId)) {
      newArray = newArray.filter(day => day !== topingId);
    }
    var price = 0;
    for (var i = 0; i <= newArray.length+1; i++) {
      const findData = dataToping.find(data => data.id === newArray[i])
      if (findData !== undefined) {
        price += findData.price
      }
    }
    setGetPrice(price)
    console.log(newArray)
    // console.log(price)
    setPilihToping(newArray);
    // console.log("DataToping", dataToping)
  }
  console.log("DataToping", pilihToping)
  console.log("price", getPrice)

  const addQty = () => {
    setQty(qty + 1);
  };
  const removeQty = () => {
    if (qty === 1) {
      return;
    }
    setQty(qty - 1);

  };

  const addCart = async (e) => {
    try {
      e.preventDefault();
      // Store data with FormData as object
      const products = [{
        qty: qty,
        subtotal: qty * product.price + getPrice,
        topings:pilihToping,
      }]
      
      // Insert product data
      const response = await API.post(`/cart/${id}`, products);
      console.log(response);
      // setshow(true)

      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <>
          <Row>
            <Col id="detailImg" sm="4">
              {/* <div id="ImgdetailProduct"> */}
                <img
                  src={product.image}
                  alt="product"
                  style={{width:"350px",height:"400px",objectFit:"cover"}}
                  // className="shadow-sm img-fluid rounded"
                />
              {/* </div> */}
            </Col>

            <Col sm="6" style={{ paddingTop: "20px" }}>
              <p id="detailTitle" className="h1 font-weight-bold" >{product.title}</p>
              <p id="pricestyle"> Rp. {product.price}</p>
              {/* membuat element pembungkus */}
              <div id="topingsWrap">
                {/* overflow auto sama seting height  */}
              {dataToping.map((item, index) => (
                <div id="topingDiv" >
                  <>
                    <input name={item.title} value={item.id} type="checkbox" id={` "myCheckbox ${item.id} " `}
                      className="check"
                      onChange={findTopping}
                    />
                    <label id="topingImgWrap" for={` "myCheckbox ${item.id} " `} >
                      <img src={item.image} id="topingStyle" class="topingstyle" />
                      <p id="topingTitle">{item.title}</p>
                    </label>
                  </>
                </div>
              ))}
              </div>

              <Row>
                <Col sm="4">
                  <>
                    <Row style={{ width: "100px" }}>
                      <Col md="2" >
                        <Button id="plusBtn" onClick={removeQty} size="sm">
                          -
                                </Button>
                      </Col>
                      <Col md="2" >

                        <p style={{ paddingLeft: "5px" }}> {qty}</p>
                      </Col>
                      <Col md="2" >
                        <Button id="minusBtn" onClick={addQty} size="sm">
                          +
                                </Button>
                      </Col>
                    </Row>
                    <h5>Total</h5>
                  </>

                </Col>
                <Col sm="2"></Col>
                <Col sm="4">
                  <p id="totaltitle"> Rp. {qty * product.price + getPrice}</p>

                </Col>
              </Row>
              <Button id="payBtn" style={{ width: "544px" }} 
                onClick={addCart}
              >
                <p style={{ color: "white" }}>Add to Cart</p>
              </Button>
            </Col>

          </Row>
        </>
    </>
  );
};

export default DetailProduct;
