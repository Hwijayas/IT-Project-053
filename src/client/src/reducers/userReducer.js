const defaultState = {
    loggedIn: false,
    user: {},
    loginErrors: '',
    updateErrors:[],
    loading: false,
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
      localStorage.clear();
      return {
          ...state,
          loggedIn: false,
          user: {},
          updateErrors: [],
          loginErrors:'',
          loading:false,
      }
    case "SET_ERRORS":
      return {
          ...state,
          loginErrors: action.payload
        }
    case "EMPTY_ERRORS":
      return {
          ...state,
          loginErrors: '',
          updateErrors: []
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }
    
    default: return state
  }
}

export default userReducer