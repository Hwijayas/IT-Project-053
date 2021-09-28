const defaultState = {
    dealList: [],
    dealErrors: '',
}

const dealReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_DEALS":
            return {
                ...state,
                dealList: [...state.dealList, action.payload]
            }
        
        case "DELETE_DEAL":
            return{
                ...state,
                dealList : [state.dealList.filter(item => item !== action.payload)]
            }
        case "SET_DEAL_ERRORS":
            return {
                ...state,
                dealErrors: action.payload
              }

        default: return state
    }


}

export default dealReducer