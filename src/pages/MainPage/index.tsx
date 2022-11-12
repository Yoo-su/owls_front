import { useEffect, memo } from 'react'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import PostInput from './PostInput';
import PostDialog from './PostDialog';
import { PostsWrapper, LoadingBox, EmptyContentBox } from './styles';
import Post from './Post';
import { useAppDispatch, useAppSelector } from "store/hook";
import { setPosts, setPostsLoading } from "store/slice/postSlice";
import { getAllPosts } from 'api/post';


const MainPage = () => {
    const dispatch = useAppDispatch();
    const { posts, postsLoading, openPostDialog } = useAppSelector((state) => state.post);

    useEffect(() => {
        getAllPosts()
            .then(res => {
                dispatch(setPosts(res.data.posts));
                dispatch(setPostsLoading(false));
            })
            .catch((err) => {
                dispatch(setPosts([]));
                dispatch(setPostsLoading(false));
            })
    }, []);

    return (
        <Container>
            <PostInput />

            <PostsWrapper>
                <div className="postsHeader">
                    게시물 목록 🦉
                </div>
                {postsLoading ? (
                    <LoadingBox>
                        <CircularProgress size={150} />
                    </LoadingBox>) :
                    (posts?.length > 0) ? posts.map(post => (
                        <Post key={post.post_id} {...post} />
                    )) : (
                        <EmptyContentBox>
                            <MoodBadIcon />
                            <label>게시물이 존재하지 않습니다</label>
                        </EmptyContentBox>)
                }

            </PostsWrapper>
            {openPostDialog && (<PostDialog open={openPostDialog} />)}
        </Container>
    )
}

export default memo(MainPage);