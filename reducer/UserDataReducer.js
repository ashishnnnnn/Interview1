export function UserDataReducer(state, action) {
  switch (action.type) {
    case "updateCart":
      const updatedCartAfterAdd = {
        ...action.payload ,
      };
      return {cart:updatedCartAfterAdd};

    case "resetCart":
      return { cart: {
        items:[],
        total:null
      } };

    default:
      return state;
  }
}
