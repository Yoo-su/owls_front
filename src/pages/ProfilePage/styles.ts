import styled from "styled-components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const ProfileContainer = styled(Container)`
    padding:2rem 0;
    
`;

export const UserBox = styled(Box)`
    position:relative;
    display:flex;
    flex-direction: column;
    background-color:#fff;
    border-radius:1rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    padding:1rem;
    font-family: 'Jua', sans-serif;

    .head{
        display:flex;
        align-items:center;

        .basicInfo{
            display:flex;
            flex-direction: column;
            align-items: center;
            padding:0.5rem;

            .MuiAvatar-root{
                width: 184px;
                height:184px;
                margin-bottom:0.5rem;
                
                @media all and (min-width: 0px) and (max-width:640px){
                    width:82px;
                    height:82px;
                }
            }
            @media all and (min-width: 0px) and (max-width:640px){
                b{
                    font-size:0.8rem;
                }
            }
            
        }

        .info{
            display:flex;
            justify-content: center;
            flex-grow:1;

        .infoItem{
            display:flex;
            flex-grow:1;
            flex-direction: column;
            align-items:center;
            font-size:28px;

            @media all and (min-width: 0px) and (max-width:640px){
                font-size:18px;
            }
        }
        }
    }

    .body{
        margin-top:1rem;
        display:flex;

    } 

    .addFriendBtn{
        position:absolute;
        top:1rem;
        right:2rem;

        @media all and (min-width: 0px) and (max-width:640px){
            top:0.2rem;
            right:0.2rem;
        }
    }
`;

export const UserPostsBox = styled(Box)`
    display:flex;
    flex-direction: column;
    
`;

export const LoadingBox = styled(Box)`
    display:flex;
    justify-content: center;
    margin-top:8rem;

`;

export const PostsBox = styled(Box)`
    display:flex;
    flex-direction: column;

`;

export const EmptyBox = styled(Box)`
    display:flex;
    align-items: center;
    justify-content: center;
    padding-top:3rem;
`;