const defaultState = {
    dealList: [],
    dealErrors: '',
    update: false,
    view: false,
}

const dealReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_DEALS":
            return {
                ...state,
                dealList: [...action.payload]
            }
        case "ADD_DEAL":
            console.log(action.payload.status)
            return{
                ...state,
                dealList: [...state.dealList, action.payload]
                
            }

        case "DELETE_DEAL":
            console.log("delete called")
            return{
                ...state,
                dealList : state.dealList.filter(item => item._id !== action.payload)
            }
        case "SET_DEAL_ERRORS":
            return {
                ...state,
                dealErrors: action.payload
            }
        
        case "SET_EDITING":
            
            return{
                ...state,
                update: action.payload
            }

        case "SET_VIEWING":
            console.log("viewing")
            return{
                ...state,
                view: action.payload
            }

        case "UPDATE_DEAL":
            
            return{
                ...state,
                dealList : state.dealList.map((deal, index) =>
                            deal._id === action.payload.id ? 
                            {...deal, status: action.payload.status} : deal
                            )
            }
        
        case "SET_CURRENT_DEAL":
        
            return{
                ...state,
                currentDeal: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                dealList: [],
                dealErrors: '',
                update: false,
            }

        default: return state
    }


}

export default dealReducer