import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostSliceType, PostType } from "types";

const initialState: PostSliceType = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostType[]>) => {
            state.posts = action.payload;
        }

    }
})

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;