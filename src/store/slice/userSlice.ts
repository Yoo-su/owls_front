import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userSliceType } from "types";

const initialState: userSliceType = {
    userEmail: "",
    userNickname: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userSliceType>) => {
            const { userEmail, userNickname } = action.payload;
            state.userEmail = userEmail;
            state.userNickname = userNickname;
        }

    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;