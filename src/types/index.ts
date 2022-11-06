/* 스토어 관련 타입들 */
export interface UserSliceType {
    userEmail: string;
    userNickname: string;
}

export interface PostSliceType {
    posts: PostType[];
}

/* 컴포넌트 관련 타입들 */
export interface PostType {
    postText: string;
    postImage?: string;
    postedDate: string;
    author: string;
    authorProfileImg: string;
}