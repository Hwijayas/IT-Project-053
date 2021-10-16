const defaultState = {
  customerList: [],
  customerErrors: '',
  update: false,
  view: false,
}

const customerReducer = (state = defaultState, action) => {
  switch(action.type){
    case "SET_CUSTOMERS":
      return {
        ...state,
        customerList: [...action.payload]
      }
    case "ADD_CUSTOMER":
      return{
        ...state,
        customerList: [...state.customerList, action.payload]
      }

    case "DELETE_CUSTOMER":
      return{
        ...state,
        customerList : state.customerList.filter(item => item._id !== action.payload)
      }

    case "UPDATE_DEAL":

      return{
        ...state,
        dealList : state.dealList.map((deal, index) =>
          deal._id === action.payload.id ?
            {...deal, status: action.payload.status} : deal
        )
      }

    case "LOGOUT":
      return {
        ...state,
        customerList: [],
        customerErrors: '',
        update: false,
        view: false,
      }

    default: return state
  }

}

export default customerReducer