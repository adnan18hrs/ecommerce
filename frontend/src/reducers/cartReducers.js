
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS } from '../constants/cartConstants'

//cartItems are items which are already avaiable in user's cart
export const cartReducers = (state ={cartItems: [], shippingAddress: {}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload //item selected to put in cart
            //checking if item already exist inside cart or not
            const existItem = state.cartItems.find(x => x.product === item.product)

            //now item already present in cart, then removes that item from cart & adding new item which came from UI with action
            if(existItem){ 
                return{
                    ...state,//it means taking current state
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x
                    )
                }
            }
            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item] //if item is not present inside cart then, return cart & item together into cartItems
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
        }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
        }
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems: []
        }
        
        default:
            return state
    }
    
}

export default cartReducers
