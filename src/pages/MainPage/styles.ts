import styled from "styled-components";
import { Box } from '@mui/material'

export const PostsWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin-top:2rem;

    .postsHeader{
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-family: 'Noto Serif KR', serif;
        font-size:24px;
        white-space: nowrap;

        @media all and (min-width: 0px) and (max-width:640px) {
            h2{
                font-size:1.5rem;
            }
        }
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


export const Pagination = styled(Box)`
    display:flex;
    justify-content: center;
    margin:1rem 0;
`;