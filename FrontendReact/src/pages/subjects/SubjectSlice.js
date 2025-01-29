import { createSlice } from "@reduxjs/toolkit";
import { CRUD } from "../../utils/consts";

const initialState = {
    openedRead: false,
    openedUpdate: false,
    openedDelete: false,
    data: [],
    currentRecordId: null
}

export const SubjectSlice = createSlice({
    name: "SubjectSlice",
    initialState: initialState,
    reducers: {
        setOpened: (state, action) => {
            if (action.payload == CRUD.READ) {
                state.openedRead = !state.openedRead;
            }
            if (action.payload == CRUD.UPDATE) {
                state.openedUpdate = !state.openedUpdate;
            }
            if (action.payload == CRUD.DELETE) {
                state.openedDelete = !state.openedDelete;
            }
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setCurrentRecordId: (state, action) => {
            state.currentRecordId = action.payload;
        }
    }
})

export const actions = SubjectSlice.actions;
