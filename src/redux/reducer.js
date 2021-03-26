const initialState = {
  username: "",
  profilePicture: ""
}

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT"; 
export const updateUser = (userObject) => {
  return {
    type:UPDATE_USER,
    payload:{...userObject}
  }
}

export const logout = () => {
  return {
    type:"LOGOUT"
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      const {username, profilePicture} = action.payload
      state = {...state,...{username, profilePicture}}; 
      return state; 
    case LOGOUT:
      state = {...state, ...{username:"", profilePicture:""}};
      return state;
    default:
      console.log(`${action.type} is not a valid case`);
      return state; 
  }
}