import styled from "styled-components";
import { Box } from '@mui/material'

export const PostBox = styled(Box)`
    display:flex;
    flex-direction: column;
    padding:1rem 0;
    margin:2rem 0;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius:1rem;
    background-color: #fff;
    font-family: 'Gowun Batang', serif;

    .postHeader{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        padding:0 1.25rem;
        margin:1rem 0.5rem;

        .profileImg{
            border-radius:50%;
        }

        .postInfo{
            display:flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            margin-left:1rem;

            .author{
                font-weight: 500;
                font-size:1.25rem;
            }
            .postedDate{
                font-size:1rem;
                color: rgb(156 163 175);
            }
        }
    }

    .postContent{
        display:flex;
        flex-direction: column;
        background-color: #fbfbf8;
        cursor:pointer;

        .postImage{
            display:flex;
            justify-content: center;
            position: relative;
            overflow:hidden;
            height:48rem;
            background-color: #fbfbf8;
            img{
                object-fit: contain;
                height:100%;
            }

            
        }
        .postText{
            background-color: #E8E9E4;
            margin:1rem 0;
            padding:0 1rem;
            min-height:7rem;
        }
    }
`;