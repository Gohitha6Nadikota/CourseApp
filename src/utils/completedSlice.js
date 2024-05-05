import { createSlice } from "@reduxjs/toolkit"

const completedSlice = createSlice({
    name: "completed",
    initialState: {
        completed:[]
    },
    reducers: {
        addComplete: (state, action) => {
            state.completed=action.payload
        }
    }
})

export const { addComplete } = completedSlice.actions;
export default completedSlice.reducer;