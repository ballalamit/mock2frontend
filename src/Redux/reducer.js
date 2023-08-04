const initialState = {
    products: [],
    loading: false,
    error: null
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return{
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null
            }
        case "DISPLAY_PRODUCT":
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }
    
        default:
            return state;
    }
}

export default reducer