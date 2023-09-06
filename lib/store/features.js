

import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    cart: [],
    wishList: [],
    isCartOpen: false,
    iswishListOpen: false,
    Token: null,
    name: '',
    email: '',
}


const Slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const checkIfAlreadyExist = state.cart.some((product) => product.id === action.payload.id);
            checkIfAlreadyExist ? state.cart = state.cart.filter((product) => product?.id === action.payload.id ? product.qty = product.qty + 1 : product.qty)

                : state.cart = [...state.cart, action.payload];

            console.log(state.cart);

        },
        changeQty: (state, action) => {
            state.cart = state.cart.filter((product) => product?.id === action.payload.id ? product.qty = action.payload.qty : product.qty)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id)
        },
        loginStore: (state, action) => {
            state.Token = action.payload.token;
            state.email = action.payload.email;
            state.name = action.payload.name;

        },
        logout: (state) => {
            state.Token = ''
            state.email = ''
            state.name = ''
        },
        cartCloseOrOpen: (state) => {
            state.isCartOpen = !state.isCartOpen
        },
        wishListCloseOrOpen: (state) => {
            state.iswishListOpen = !state.iswishListOpen
        },
        addToWishList: (state, action) => {
            const checkIfAlreadyExists = state.wishList.some((prod) => prod.id === action.payload.id)

            state.wishList = !checkIfAlreadyExists && [...state.wishList, action.payload]
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter((prod) => prod.id !== action.payload.id)
        }
    }
});



export const { addToCart, cartCloseOrOpen, changeQty, loginStore, logout, removeFromCart, addToWishList, removeFromWishList, wishListCloseOrOpen } = Slice.actions;
export default Slice.reducer;
