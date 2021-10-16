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
        case "LOGOUT":{
            return({
                ...state,
                userList: [],
                deals: [],
                flaggedDeals : [],
                loading: false,
                currentUser: null
            })
        }
        case "UPDATE_USER":
            return{
                ...state,
                userList : state.userList.map((user, index) =>
                  user._id === action.payload._id ?
                    {...user, userEmail: action.payload.userEmail,
                        userFirstName:action.payload.userFirstName,
                        userLastName:action.payload.userLastName} : user
                )
            }
        case "DELETE_USER":
            console.log("delete called")
            return{
                ...state,
                userList : state.userList.filter(item => item._id !== action.payload)
            }
        default: return state
    }
}

export default adminReducer