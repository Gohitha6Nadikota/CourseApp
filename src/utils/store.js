import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import enrollSlice from "./enrollSlice";
import userSlice from "./userSlice";
const MyStore = configureStore({
    reducer: {
        data: dataSlice,
        enrolls: enrollSlice,
        user:userSlice
    }
})
export default MyStore