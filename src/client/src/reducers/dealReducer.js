const defaultState = {
    deal: {},
    dealErrors: '',
}

const dealReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_DEAL":
            return {
                ...state,
                deal: {...action.payload}
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