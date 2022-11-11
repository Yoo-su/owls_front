import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserSliceType } from "types";

const initialState: UserSliceType = {
    userEmail: "",
    userNickname: "",
    userAvatar: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSliceType>) => {
            const { userEmail, userNickname, userAvatar } = action.payload;
            state.userEmail = userEmail;
            state.userNickname = userNickname;
            state.userAvatar = userAvatar;
        }

    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;