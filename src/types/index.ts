/* 스토어 관련 타입들 */
export interface UserSliceType {
    userEmail: string;
    userNickname: string;
    userAvatar: string;
}

export interface PostSliceType {
    posts: PostType[];
    postsLoading: boolean;
    openPostDialog: boolean;
    postDialog_image: string;
    postDialog_postId: number;
    postDialog_userEmail: string;
    comments: CommentType[];
}

export interface PostDialogPayload {
    postDialog_image: string;
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
    post_user: string;
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