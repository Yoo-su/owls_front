import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import PostInput from './PostInput';
import { PostsWrapper } from './styles';
import { sample } from './samplePosts';
import Post from './Post';
import { useAppDispatch, useAppSelector } from "store/hook";
import { setPosts } from "store/slice/postSlice";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector((state) => state.post);

    useEffect(() => {
        dispatch(setPosts(sample));
    }, []);

    return (
        <Container>
            <PostInput />

            <PostsWrapper>
                {posts.map((post, idx) => (
                    <Post key={idx} {...post} />
                ))}
            </PostsWrapper>
        </Container>
    )
}

export default MainPage;