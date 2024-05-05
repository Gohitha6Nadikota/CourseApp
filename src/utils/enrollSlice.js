import { createSlice } from "@reduxjs/toolkit";

const enrollSlice = createSlice({
    name: "enrolls",
    initialState: {
        enrolls:[]
    },
    reducers:
    {
        updateEnroll: (state, action)=>{
            state.enrolls = action.payload;
        }
    }
});

export const { updateEnroll } = enrollSlice.actions
export default enrollSlice.reducer