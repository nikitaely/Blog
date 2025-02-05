let initialState = {
  auth: false,
  user: {
    email: null,
    token: null,
    username: null,
    bio: null,
    image: null,
  },
};

const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("auth");

if (storedAuth) {
  initialState = {
    auth: storedAuth === "true",
    user: JSON.parse(storedUser)
  }
}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload.auth,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
