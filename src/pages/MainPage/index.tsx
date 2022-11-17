import { useEffect, useState, memo } from 'react'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Divider from "@mui/material/Divider";
import MoodBadIcon from '@mui/icons-material/MoodBad';
import PostInput from './PostInput';
import PostDialog from './PostDialog';
import { PostsWrapper, LoadingBox, EmptyContentBox, Pagination } from './styles';
import Post from './Post';
import Paginator from 'components/common/Paginator';
import usePagination from 'hooks/usePagination';
import { useAppDispatch, useAppSelector } from "store/hook";
import { get_all_posts, get_friends_posts } from "store/asyncThunks/index";

const MainPage = () => {
    const [postOpt, setPostOpt] = useState<string>("전체");

    const dispatch = useAppDispatch();
    const { posts, postsLoading, openPostDialog } = useAppSelector((state) => state.post);
    const { userEmail, friends, friendRequests } = useAppSelector((state) => state.user);
    const emails = [
        ...friends.map(friend => friend.user_email),
        ...friendRequests.map(req => req.user_email),
        userEmail];

    const ITEMS_PER_PAGE = 5;
    const {
        currentPage, getCurrentData, setCurrentPage, pageCount,
    } = usePagination(posts, ITEMS_PER_PAGE);

    const handleSelectChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        if (value === postOpt) {
            return;
        }
        if (value === "친구") {
            setPostOpt("친구");
            dispatch(get_friends_posts(userEmail));
        }
        else if (value === "전체") {
            setPostOpt("전체");
            dispatch(get_all_posts());
        }
    }

    useEffect(() => {
        dispatch(get_all_posts());
    }, []);

    return (
        <Container>
            <PostInput />

            <PostsWrapper>
                <div className="postsHeader">
                    <h2>{postOpt} 게시물 목록 🦉</h2>

                    <Box className="select" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="post-select-option-label">옵션</InputLabel>

                            <Select
                                labelId="post-select-option-label"
                                id="postSelect"
                                label="옵션"
                                onChange={handleSelectChange}
                                value={postOpt}
                            >
                                <MenuItem value="전체">전체</MenuItem>
                                <MenuItem value="친구">친구</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                </div>

                <Divider />

                {postsLoading ? (
                    <LoadingBox>
                        <CircularProgress size={150} />
                    </LoadingBox>) :
                    (posts?.length > 0) ? getCurrentData().map(post => (
                        <Post
                            key={post.post_id} {...post}
                            isMyPost={userEmail === post.user_email}
                            isFriendPost={emails.findIndex(email => email === post.user_email)} />
                    )) : (
                        <EmptyContentBox>
                            <MoodBadIcon />
                            <label>게시물이 존재하지 않습니다</label>
                        </EmptyContentBox>)
                }

            </PostsWrapper>

            {
                !postsLoading && (
                    <Pagination>
                        <Paginator
                            onPageChange={(_, newPage) => {
                                setCurrentPage(newPage);
                                window.scrollTo(0, 0);
                            }}
                            currentPage={currentPage}
                            pageCount={pageCount}
                        />
                    </Pagination>
                )
            }

            {openPostDialog && (<PostDialog open={openPostDialog} />)}
        </Container >
    )
}

export default memo(MainPage);