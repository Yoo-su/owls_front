import { useEffect, Fragment } from "react";
import * as Styled from "./styles";
import Divider from "@mui/material/Divider"
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector, useAppDispatch } from "store/hook";
import { useParams } from "react-router-dom";
import Post from "components/Post"
import Header from "./Header";
import { get_user_profile } from "store/asyncThunks";

const ProfilePage = () => {
    const { userId, profile, loading } = useAppSelector((state) => state.user);
    const { posts } = useAppSelector(state => state.post);
    const dispatch = useAppDispatch();

    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
        params?.id &&
            dispatch(get_user_profile(parseInt(params.id)));
    }, [params])

    return (
        <Styled.ProfileContainer>
            {loading ? (
                <Styled.LoadingBox>
                    <CircularProgress size={150} />
                </Styled.LoadingBox>
            ) : (profile && params.id) && (
                <Fragment>
                    <Header
                        user={profile.user}
                        postsCnt={posts.length}
                        friendsCnt={profile?.friends.length}
                        paramId={parseInt(params.id)}
                        loggedInUserId={userId}
                    />
                    <Divider sx={{ marginTop: "5rem" }} textAlign="left">{profile.user.user_nickname}님의 게시물 목록</Divider>


                    {(posts.length > 0) ? (
                        <Styled.PostsBox>
                            {posts.map(post => (
                                <Post
                                    key={post.post_id}
                                    {...post}
                                    isMyPost={userId === post.user_id}
                                />
                            ))}
                        </Styled.PostsBox>
                    ) : (
                        <Styled.EmptyBox>
                            <p>게시물이 없습니다</p>
                        </Styled.EmptyBox>
                    )}
                </Fragment>

            )}


        </Styled.ProfileContainer>
    )
}

export default ProfilePage