/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  user: null,
  basket: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set/user":
      return {
        ...state,
        user: action.payload,
      };

    case "add/item":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case "delete/item":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload),
      };

    case "clear/items":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
}

function GlobleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user, basket } = state;

  return (
    <GlobalContext.Provider value={{ user, basket, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useAuth() {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("use Globle context provider outside globle provider");
  return context;
}

export function getTotalPrice(basket) {
  return basket.reduce((acc, item) => acc + item.pricing, 0);
}

export { GlobleProvider, useAuth };
