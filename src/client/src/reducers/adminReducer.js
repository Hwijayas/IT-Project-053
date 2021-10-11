const defaultState = {
    userList: [],
    deals: [],
    flaggedDeals : [],
    loading: false,
    currentUser: null
}
const adminReducer = (state = defaultState, action) => {
    switch (action.type){
        case "SET_DEALS":{
            return ({
                ...state,
                deals: action.payload
            })
        }
        case "SET_FLAGGED":{
            return ({
                ...state,
                flaggedDeals: action.payload
            })
        }
    }
}