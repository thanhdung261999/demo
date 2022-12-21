import { FETCH_USER } from "../actions/userAction";

const INIT_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    email: "",
    username: "",
    role: "",
    image: "",
  },
  isAuthenticated: false,
};
const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          email: action?.payload?.DT?.email,
          username: action?.payload?.DT?.username,
          role: action?.payload?.DT?.role,
          image: action?.payload?.DT?.image,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
export default userReducer;
