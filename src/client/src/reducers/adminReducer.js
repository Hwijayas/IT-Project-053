const defaultState = {
    userList: [],
    deals: [],
    flaggedDeals : [],
    loading: false,
    currentUser: null
}
const adminReducer = (state = defaultState, action) => {
    switch (action.type){
        case "SET_USERS":{
            return ({
                ...state,
                userList: action.payload
            })
        }
        case "SET_FLAGGED":{
            return ({
                ...state,
                flaggedDeals: action.payload
            })
        }
        default: return state
    }
}

export default adminReducer