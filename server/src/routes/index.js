const { Router } = require("express");

// Controller
const { register, login,checkAuth } = require('../controllers/auth');
const { getUsers,updateUser,getDetailUser, deleteUser, } = require("../controllers/user");
const { deleteProduct, getProducts, getDetailProduct, addProduct, updateProduct } = require("../controllers/product");
const { addToping, getTopings, getDetailToping, updateToping, deleteToping } = require("../controllers/toping");
const { addCart,getUserCarts } = require("../controllers/cart");
const { addTransaction, getTransactions, getUserTransaction, getDetailTransaction, updateTransaction, deleteTransaction } = require("../controllers/transaction");


// const { auth } = require('../middlewares/auth')
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router();

// Route

//auth
router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);


//user
router.patch("/user", auth,uploadFile("image"), updateUser);
// router.patch("/userUpdate", auth, updateUsers);
router.get("/user", auth, getDetailUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

//product
router.get("/products", getProducts);
router.get("/product/:id", getDetailProduct);
router.post("/product", auth, uploadFile("image"), addProduct)
//update dengan gambar
router.patch("/product/:id", auth, uploadFile("image"), updateProduct)
router.delete("/product/:id", auth, deleteProduct);
//update tanpa gambar
// router.patch("/product/:id", auth, updateProduct,)

//toping
router.post("/toping", auth, uploadFile("image"), addToping)
router.get("/topings", getTopings)
router.get("/toping/:id", getDetailToping)
router.patch("/toping/:id", auth, uploadFile("image"), updateToping)
router.delete("/toping/:id", auth, deleteToping);

//cart
router.post("/cart/:id", auth, addCart)
router.get("/carts", auth, getUserCarts)


//transaction
// router.post("/transaction", auth, addTransaction)
router.post("/transaction", auth, uploadFile("image"),addTransaction)
router.get("/transactions", auth, getTransactions)
router.get("/transaction/:id", auth, getDetailTransaction)
// router.patch("/transaction/:id", auth, uploadFile("image"), updateTransaction)
router.put("/transaction/:id", auth,  updateTransaction)
router.delete("/transaction/:id", auth, deleteTransaction);
router.get("/mytransaction", auth, getUserTransaction)














module.exports = router;
