import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostDialogPayload, PostSliceType, PostType, CommentType } from "types";

const initialState: PostSliceType = {
    posts: [],
    postsLoading: true,

    openPostDialog: false,
    postDialog_image: "",
    postDialog_postId: -1,
    postDialog_userEmail: "",

    comments: []
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
        },

        setOpenPostDialog: (state, action: PayloadAction<boolean>) => {
            state.openPostDialog = action.payload;
        },

        setPostDialogInfo: (state, action: PayloadAction<PostDialogPayload>) => {
            const { postDialog_image, postDialog_postId, postDialog_userEmail } = action.payload;
            state.postDialog_image = postDialog_image;
            state.postDialog_postId = postDialog_postId;
            state.postDialog_userEmail = postDialog_userEmail;
        },

        setComments: (state, action: PayloadAction<CommentType[]>) => {
            state.comments = action.payload;
        }
    }
})

export const { setPosts, setPostsLoading, setOpenPostDialog, setPostDialogInfo, setComments } = postSlice.actions;
export default postSlice.reducer;