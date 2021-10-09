import { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";
import ModalSignin from "./components/modal/ModalSignin"
import Home from "./pages/Home";
import Header from "./components/Header";
// import Footer from "./components/Footer";

import Profile from "./pages/Profile";
import AddToping from "./pages/AddToping";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";

import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
console.log(localStorage.token)
function App() {
  const [show, setshow] = useState(false);

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  console.clear();

  console.log(state);
  // console.log(state.user.listAs);
  // console.log(localStorage.token)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      setshow(true);
    }
    //   // Redirect Auth
    if (state.isLogin === false) {
      history.push("/");
    }
    else {
      if (state.user.listAs === 1) {
        history.push("/");
      } else if (state.user.listAs === "customer") {
        history.push("/");
      }
    }
    return () => {
      setshow(false)
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log(response)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  // console.log(checkUser)
  return (
    <>
      {/* <ModalSignin show={show} handleClose={() => setshow(false)} handleLogin={dispatch}/> */}
      <Header />
      

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/addtoping" component={AddToping} />

      </Switch>
      {/* <Footer /> */}

    </>
  );
}

export default App;
