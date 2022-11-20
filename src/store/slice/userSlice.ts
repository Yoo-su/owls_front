import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserSliceType, Friend, SetUserPayload } from "types";
import { get_friends, get_wating_requests, get_friend_requests, get_user_profile } from 'store/asyncThunks';

const initialState: UserSliceType = {
    userId: null,
    userEmail: "",
    userNickname: "",
    userName: "",
    userAvatar: "",

    friends: [],
    friendRequests: [],
    waitingRequests: [],
    loading: true,

    profile: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            const { userId, userEmail, userNickname, userName, userAvatar } = action.payload;
            state.userId = userId;
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


        //profile
        builder.addCase(
            get_user_profile.pending, (state, action) => {
                state.loading = true;
            }
        )
        builder.addCase(
            get_user_profile.fulfilled, (state, action) => {
                state.profile = {
                    user: action.payload.user,
                    friends: action.payload.friends,
                };
                state.loading = false;
            }
        )
        builder.addCase(
            get_user_profile.rejected, (state, action) => {
                state.loading = false;
            }
        )
    }
})

export const { setUser, setFriends, setFriendRequests, setWatingRequests, setLoading } = userSlice.actions;
export default userSlice.reducer;