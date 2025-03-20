import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //... update to add a meal
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    state.items.dispatch(action.item);
  }

  const updatedItems = [...state.items];
  //didn't find, then return minus 1.
  if (existingCartItemIndex > -1) {
    const existingItem = state.items[existingCartItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems.push({ ...action.item, quantity: 1 });
  }

  if (action.type === "REMOVE_ITEM") {
    //... remove an item
  }

  return { ...state, items: updatedItems };
}

export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider value={{ items, addItem, removeItem }}>{children}</CartContext.Provider>;
}

export default CartContext;
