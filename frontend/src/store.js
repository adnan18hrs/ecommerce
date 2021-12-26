
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productReviewCreateReducer,
    productTopRatedReducer, productUpdateReducer,
} from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    // it clarify that when action(productList) is called then this reducer(productListReducer) will run.
    // 5.result transferred into reducer(productListReducer) will be kept by key(productList), and this key can be used on frontend.  
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart:cartReducers,
    
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList :userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{ 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{ userInfo: userInfoFromStorage },
}
const middleware = [thunk]
//creating a store (one react app can have only 1 store)
// 3rd argument of createStore is enhance store with third-party capabilities 
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

//getState() retrieve the current state of your Redux store
//store.getState()

export default store