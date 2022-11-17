import { createAsyncThunk, } from '@reduxjs/toolkit'
import { PostType, Friend, CommentType } from 'types'
import { getAllPosts, getFriendPosts } from 'api/post'
import { getComments } from 'api/comment';
import { getFriends, getMyRequests, getFriendRequests } from "api/friend";

export const get_all_posts = createAsyncThunk<PostType[]>(
    "GET_ALL_POSTS",
    getAllPosts
)

export const get_friends_posts = createAsyncThunk<PostType[], string>(
    "GET_FRIENDS_POSTS",
    getFriendPosts
)

export const get_comments = createAsyncThunk<CommentType[], number>(
    "GET_COMMENTS",
    getComments
);

export const get_friends = createAsyncThunk<Friend[], string>(
    "GET_FRIENDS",
    getFriends
)

export const get_wating_requests = createAsyncThunk<Friend[], string>(
    "GET_WAITING_REQUESTS",
    getMyRequests
)

export const get_friend_requests = createAsyncThunk<Friend[], string>(
    "GET_FRIEND_REQUESTS",
    getFriendRequests
)