/* 스토어 관련 타입들 */
export type Friend = {
    friend_id: number;
    user_email: string;
    user_avatar: string;
    user_nickname: string;
    updated_date: string;
    created_date: string;
}
export interface UserSliceType {
    userEmail: string;
    userNickname: string;
    userName: string;
    userAvatar: string;

    friends: Friend[];
    friendRequests: Friend[];

    waitingRequests: Friend[];
    loading: boolean;
}

export interface SetUserPayload {
    userEmail: string;
    userAvatar: string;
    userNickname: string;
    userName: string;
}

export interface PostSliceType {
    posts: PostType[];
    postsLoading: boolean;
    openPostDialog: boolean;
    postDialog_image: string;
    postDialog_postId: number;
    postDialog_userEmail: string;
    postDialog_text: string;
    comments: CommentType[];
    commentsLoading: boolean;
}

export interface UiSliceType {
    openSnack: boolean;
    snackMessage: string;
    snackType: "success" | "danger" | "info";
}

export interface SnackPayload {
    message: string;
    type: "success" | "danger" | "info";
}

export interface PostDialogPayload {
    postDialog_image: string;
    postDialog_text: string;
    postDialog_postId: number;
    postDialog_userEmail: string;
}

/* 컴포넌트 관련 타입들 */
export interface CommentType {
    comment_id: number;
    comment_text: string;
    comment_date: string;
    user_email: string;
    user_avatar: string;
    user_nickname: string;
}

export interface PostType {
    post_id: number;
    post_text: string;
    post_image: string;
    post_date: string;
    user_name: string;
    user_email: string;
    user_avatar: string;
    user_nickname: string;
}

export interface CreatePostType {
    postText: string;
    file?: FormData;
    postedDate: string;
    user: string;
    fileName: string;
}

export interface CreateCommentType {
    comment_text: string;
    comment_date: string;
    comment_post: number;
    comment_user: string;
}