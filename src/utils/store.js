import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import groupSlice from "./slices/groupSlice";
import autoSuggestionUserSlice from "./slices/userAutoSuggestionSlice"
const store=configureStore({
    reducer:{
        auth:authSlice,
        group:groupSlice,
        autoSuggestionUser:autoSuggestionUserSlice
    }
})

export default store