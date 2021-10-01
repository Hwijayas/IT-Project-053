const defaultState = {
    loggedIn: false,
    user: {
      email:'',
      fistName:'',
      lastName:''
    },
    message:'',
    loginErrors: '',
    updateErrors:[],
    loading: false,
    authPopUp: true
}

const userReducer = (state = defaultState, action) => {
  switch(action.type){
    case "CLEAR_MESSAGE":{
      return{
        ...state,
        message:''
      }
    }
    case "SET_MESSAGE":{
      return {
        ...state,
        message: action.payload
      }
    }
    case "SET_AUTH":
      return {
        ...state,
        authPopUp:action.payload
      }
    case "SET_USER":
      return {
          ...state,
          loggedIn: true,
          user: action.payload
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