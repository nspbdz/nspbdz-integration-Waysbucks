
import { Col, Row } from "react-bootstrap";
import not_found from "../assets/images/not_found.svg";
import noPhoto from "../assets/images/francesco.jpg";
const ProfileList = ({ data, loading, }) => {

  if (loading) return <p>...loading</p>;
  const item = data
  console.log(data.image)

if(item.image == "http://localhost:5000/uploads/null"){
  console.log("kosong")
}
  return (
    // <p>asmdnsadn</p>

    <Row>
      {data?.length <= 0 && (
        <img src={not_found} width="100%" height="100%" alt="not found" />
      )}
      {item ?

        <>
          <Col xs={6}>
            <div>
              <h4 id="myProfileText" style={{ paddingTop: "70px" }}>My Profile</h4>
              {item.image == "http://localhost:5000/uploads/null" ? <img src={noPhoto} id="profileStyle" /> 
              :<img src={item.image} id="profileStyle"   />  }
            </div>
          </Col>
          <Col sm="4" >
            <br></br>
            <br></br>
            <h5 id="profileName" > Full Name   </h5>
            <p>   {item.fullName}    </p>
            <h5 id="emailName"> Email </h5>
            <p>   {item.email}    </p>
          </Col>

        </>

        : null}

    </Row>


  );
};

export default ProfileList;
