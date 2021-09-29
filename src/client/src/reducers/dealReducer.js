const defaultState = {
    dealList: [],
    dealErrors: '',
    update: false
}

const dealReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_DEALS":
            return {
                ...state,
                dealList: [...action.payload]
            }
        case "ADD_DEAL":
            return{
                ...state,
                dealList: [...state.dealList, action.payload]
            }

        case "DELETE_DEAL":
            console.log("delete called")
            const newList = [state.dealList.filter(item => item._id !== action.payload)]
            return{
                ...state,
                dealList : newList
            }
        case "SET_DEAL_ERRORS":
            return {
                ...state,
                dealErrors: action.payload
            }
        
        case "SET_UPDATE":
            
            return{
                ...state,
                update: action.payload
            }
        default: return state
    }


}

export default dealReducer