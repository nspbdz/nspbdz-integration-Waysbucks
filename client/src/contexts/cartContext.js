import { useReducer, createContext } from "react";


export const CartContext = createContext();

const initialState = {
  carts: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  const { type, data } = action;
  console.log(data)
  switch (type) {
    case "ADD_PRODUCT":
      const isProductExist = state.carts.find(product => product.id === data.id);

      if (isProductExist) {
        const updatedProduct = state.carts.map(product => {
          if (product.id === data.id) {
            return {
              ...product,
              qty: product.qty + 1
            }
          }
          return {
            ...product
          }
        })

        return {
          ...state,
          carts: updatedProduct
        }
      }
      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...data,
            qty: 1
          }
        ]
      }

    case "REMOVE_PRODUCT":
      const updatedProduct = state.carts.map(product => {
        if (product.id === data.id) {
          return {
            ...product,
            qty: product.qty <= 1 ? product.qty : product.qty - 1
          }
        } else {
          return product
        }
      })

      return {
        ...state,
        carts: updatedProduct
      }
    case "REMOVE_CART":
      const filteredCarts = state.carts.filter(product => product.id !== data.id)
      return {
        ...state,
        carts: filteredCarts
      }

    default:
      throw new Error("unknown case")
  }
}
export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

