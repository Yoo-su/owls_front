/* 스토어 관련 타입들 */
export interface UserSliceType {
    userEmail: string;
    userNickname: string;
}

export interface PostSliceType {
    posts: PostType[];
    postsLoading: boolean;
}

/* 컴포넌트 관련 타입들 */
export interface CommentType {
    commentId: string;

}

export interface PostType {
    post_id: string;
    post_text: string;
    post_image?: string;
    post_date: string;
    post_user: string;
    user_email: string;
    user_image: string;
    user_nickname: string;
}

export interface CreatePostType {
    postText: string;
    file?: FormData;
    postedDate: string;
    user: string;
    fileName: string;
}