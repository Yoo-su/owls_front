import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostDialogPayload, PostSliceType, PostType, CommentType } from "types";
import { get_all_posts, get_friends_posts, get_comments } from 'store/asyncThunks';

const initialState: PostSliceType = {
    posts: [],
    postsLoading: false,

    openPostDialog: false,
    postDialog_image: "",
    postDialog_text: "",
    postDialog_postId: null,
    postDialog_userEmail: "",
    postDIalog_userId: null,

    comments: [],
    commentsLoading: true,
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
            const { postDialog_image, postDialog_postId, postDialog_userEmail, postDialog_text } = action.payload;
            state.postDialog_image = postDialog_image;
            state.postDialog_postId = postDialog_postId;
            state.postDialog_userEmail = postDialog_userEmail;
            state.postDialog_text = postDialog_text;
        },

        setComments: (state, action: PayloadAction<CommentType[]>) => {
            state.comments = action.payload;
        },

        setCommentsLoading: (state, action: PayloadAction<boolean>) => {
            state.commentsLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        //allPosts
        builder.addCase(
            get_all_posts.pending, (state, action) => {
                state.postsLoading = true;
            }
        )
        builder.addCase(
            get_all_posts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.postsLoading = false;

            }
        )
        builder.addCase(
            get_all_posts.rejected, (state, action) => {
                state.postsLoading = false;
            }
        )

        //friendPosts
        builder.addCase(
            get_friends_posts.pending, (state, action) => {
                state.postsLoading = true;
            }
        )
        builder.addCase(
            get_friends_posts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.postsLoading = false;

            }
        )
        builder.addCase(
            get_friends_posts.rejected, (state, action) => {
                state.postsLoading = false;
            }
        )

        //comments
        builder.addCase(
            get_comments.pending, (state, action) => {
                state.commentsLoading = true;
            }
        )
        builder.addCase(
            get_comments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.commentsLoading = false;

            }
        )
        builder.addCase(
            get_comments.rejected, (state, action) => {
                state.commentsLoading = false;
            }
        )
    }
})

export const { setPosts, setPostsLoading, setOpenPostDialog, setPostDialogInfo, setComments, setCommentsLoading } = postSlice.actions;
export default postSlice.reducer;