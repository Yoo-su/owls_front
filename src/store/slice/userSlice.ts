import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserSliceType, Friend, SetUserPayload } from "types";

const initialState: UserSliceType = {
    userEmail: "",
    userNickname: "",
    userName: "",
    userAvatar: "",

    friends: [],
    friendRequests: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            const { userEmail, userNickname, userName, userAvatar } = action.payload;
            state.userEmail = userEmail;
            state.userNickname = userNickname;
            state.userName = userName;
            state.userAvatar = userAvatar;
        },

        setFriends: (state, action: PayloadAction<Friend[]>) => {
            state.friends = action.payload;
        },

        setFriendRequests: (state, action: PayloadAction<Friend[]>) => {
            state.friendRequests = action.payload;
        }


    }
})

export const { setUser, setFriends, setFriendRequests } = userSlice.actions;
export default userSlice.reducer;