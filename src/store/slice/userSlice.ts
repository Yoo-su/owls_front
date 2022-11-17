import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserSliceType, Friend, SetUserPayload } from "types";
import { get_friends, get_wating_requests, get_friend_requests } from 'store/asyncThunks';

const initialState: UserSliceType = {
    userEmail: "",
    userNickname: "",
    userName: "",
    userAvatar: "",

    friends: [],
    friendRequests: [],
    waitingRequests: [],
    loading: true,
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
        },

        setWatingRequests: (state, action: PayloadAction<Friend[]>) => {
            state.waitingRequests = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }

    },
    extraReducers: (builder) => {
        //friends
        builder.addCase(
            get_friends.fulfilled, (state, action) => {
                state.friends = action.payload;
            }
        )

        //watingRequests
        builder.addCase(
            get_wating_requests.pending, (state, action) => {
                state.loading = true;
            }
        )
        builder.addCase(
            get_wating_requests.fulfilled, (state, action) => {
                state.waitingRequests = action.payload;
                state.loading = false;
            }
        )
        builder.addCase(
            get_wating_requests.rejected, (state, action) => {
                state.loading = false;
            }
        )

        //friendRequets
        builder.addCase(
            get_friend_requests.pending, (state, action) => {

            }
        )
        builder.addCase(
            get_friend_requests.fulfilled, (state, action) => {
                state.friendRequests = action.payload;
            }
        )
        builder.addCase(
            get_friend_requests.rejected, (state, action) => {
            }
        )
    }
})

export const { setUser, setFriends, setFriendRequests, setWatingRequests, setLoading } = userSlice.actions;
export default userSlice.reducer;