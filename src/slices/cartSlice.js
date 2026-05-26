import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const defaultState = {
    exchangeItems: [],
    startDate: null,
    duration: null,
    daysLate: 0,
    isBookDamaged: false,
    shippingAddress: {},
    paymentMethod: '',
    membershipPrice: '9.99',
    lateFee: '0.00',
    damageFee: '0.00',
    totalPrice: '9.99',
};

const savedCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;

const initialState = savedCart
    ? {
        ...defaultState,
        ...savedCart,
        exchangeItems: savedCart.exchangeItems || savedCart.cartItems || [],
    }
    : defaultState;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToExchangeList: (state, action) => {
            const item = action.payload;
            const existItem = state.exchangeItems.find((x) => x._id === item._id);
            if (existItem) {
                state.exchangeItems = state.exchangeItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.exchangeItems = [...state.exchangeItems, item];
            }
            return updateCart(state);
        },
        removeFromExchangeList: (state, action) => {
            state.exchangeItems = state.exchangeItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveExchangeDate: (state, action) => {
            state.startDate = action.payload.startDate;
            state.duration = action.payload.duration;
            return updateCart(state);
        },
        reportLateReturn: (state, action) => {
            state.daysLate = action.payload;
            return updateCart(state);
        },
        reportBookDamage: (state, action) => {
            state.isBookDamaged = action.payload;
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearExchangeList: (state) => {
            state.exchangeItems = [];
            return updateCart(state);
        },
    },
});

export const {
    addToExchangeList,
    removeFromExchangeList,
    saveExchangeDate,
    reportLateReturn,
    reportBookDamage,
    saveShippingAddress,
    savePaymentMethod,
    clearExchangeList,
} = cartSlice.actions;

export default cartSlice.reducer;
