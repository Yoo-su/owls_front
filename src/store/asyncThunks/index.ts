import { createAsyncThunk, } from '@reduxjs/toolkit'
import { PostType, Friend, CommentType, Profile } from 'types'
import { getAllPosts, getFriendPosts } from 'api/post'
import { getComments } from 'api/comment';
import { getProfile } from "api/user";
import { getFriends, getMyRequests, getFriendRequests } from "api/friend";

export const get_all_posts = createAsyncThunk<PostType[]>(
    "GET_ALL_POSTS",
    getAllPosts
)

export const get_friends_posts = createAsyncThunk<PostType[], number>(
    "GET_FRIENDS_POSTS",
    getFriendPosts
)

export const get_comments = createAsyncThunk<CommentType[], number>(
    "GET_COMMENTS",
    getComments
);

export const get_friends = createAsyncThunk<Friend[], number>(
    "GET_FRIENDS",
    getFriends
)

export const get_wating_requests = createAsyncThunk<Friend[], number>(
    "GET_WAITING_REQUESTS",
    getMyRequests
)

export const get_friend_requests = createAsyncThunk<Friend[], number>(
    "GET_FRIEND_REQUESTS",
    getFriendRequests
)

export const get_user_profile = createAsyncThunk<Profile, number>(
    "GET_USER_PROFILE",
    getProfile,
)