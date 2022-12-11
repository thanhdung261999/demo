const initState = {
  user: [
    {
      id: 1,
      name: "Thanh dung",
    },
    {
      id: 2,
      name: "eric",
    },
  ],
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_ACTION":
      const user = state.user.filter((item) => action.payload.id !== item.id);
      return {
        ...state,
        user,
      };
    case "CREATE_ACTION":
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    default:
      return state;
  }
};
export default rootReducer;
