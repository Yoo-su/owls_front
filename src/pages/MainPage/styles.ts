import styled, { keyframes } from "styled-components";
import { Box } from '@mui/material'

export const PostsWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin-top:2rem;

    .postsHeader{
        display:flex;
        align-items:center;
        border-bottom:0.3px solid rgba(0,0,0,0.4);
        font-family: 'Gowun Batang';
        font-size:24px;
    }
`;

export const EmptyContentBox = styled(Box)`
    display:flex;
    flex-direction: column;
    align-items: center;
    color:rgba(0,0,0,0.6);
    margin-top:3rem;

    .MuiSvgIcon-root{
        font-size:10rem;
    }
`;

export const LoadingBox = styled(Box)`
    display:flex;
    justify-content: center;
    margin-top:3rem;
`;

