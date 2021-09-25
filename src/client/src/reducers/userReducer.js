const defaultState = {
    loggedIn: false,
    user: {},
    loginErrors: [],
}

const userReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_USER":
      return {
          ...state,
          loggedIn: true,
          user: {...action.payload}
      }
    case "LOGOUT":
      localStorage.clear()
      return {
          ...state,
          loggedIn: false,
          user: {}
      }
    case "SET_ERRORS":
      return {
          ...state,
          loginErrors: {...action.payload}
        }
    case "EMPTY_ERRORS":
      return {
          ...state,
          loginErrors: [],
          updateErrors: []
      }
    
    default: return state
  }
}

export default userReducer