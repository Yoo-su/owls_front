import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostSliceType, PostType } from "types";

const initialState: PostSliceType = {
    posts: [],
    postsLoading: true
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostType[]>) => {
            state.posts = action.payload;
        },

        setPostsLoading: (state, action: PayloadAction<boolean>) => {
            state.postsLoading = action.payload;
        }
    }
})

export const { setPosts, setPostsLoading } = postSlice.actions;
export default postSlice.reducer;