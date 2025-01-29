import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    data: []
}

export const SubjectSlice = createSlice({
    name: "SubjectSlice",
    initialState: initialState,
    reducers: {
        setOpened: (state, action) => {
            state.opened = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const { setOpened, setData } = SubjectSlice.actions;
