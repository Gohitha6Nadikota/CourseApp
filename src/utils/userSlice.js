import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        details:[]
    },
    reducers: {
        setDetails: (state, action) => {
            state.details.push(action.payload);
        },
        deleteDetails: (state) => {
            state.details = [];
        }
    }
})

export const { setDetails,deleteDetails } = userSlice.actions;
export default userSlice.reducer