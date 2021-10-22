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

    case "UPDATE_CUSTOMER":

      return{
        ...state,
        customerList : state.customerList.map((customer, index) =>
          customer._id === action.payload._id ?
            {...action.payload} : customer
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