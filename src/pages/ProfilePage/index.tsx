import { useEffect } from "react";
import * as Styled from "./styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "store/hook";
import { useParams } from "react-router-dom";
import useGetProfile from "hooks/useGetProfile";
import Post from "pages/MainPage/Post"
import Header from "./Header";

const ProfilePage = () => {
    const { userId } = useAppSelector((state) => state.user);
    const { loading, data, error, execute } = useGetProfile();
    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
        params?.id &&
            execute(parseInt(params.id));
    }, [params])

    return (
        <Styled.ProfileContainer>
            {loading ? (
                <Styled.LoadingBox>
                    <CircularProgress size={150} />
                </Styled.LoadingBox>
            ) : (data && params.id) && (
                <Header
                    user={data?.user}
                    postsCnt={data?.posts.length}
                    friendsCnt={data?.friends.length}
                    paramId={parseInt(params.id)}
                    loggedInUserId={userId}
                />
            )}

            <Divider sx={{ marginTop: "5rem" }} textAlign="left">{data?.user?.user_nickname}님의 게시물 목록</Divider>


            {(data && data.posts.length > 0) ? (
                <Styled.PostsBox>
                    {data.posts.map(post => (
                        <Post
                            key={post.post_id}
                            {...post}
                            isMyPost={userId === post.user_id}
                        />
                    ))}
                </Styled.PostsBox>
            ) : (
                <Styled.EmptyBox>

                </Styled.EmptyBox>
            )}
        </Styled.ProfileContainer>
    )
}

export default ProfilePage