import styled, { keyframes } from "styled-components";
import { Box } from '@mui/material'

const shake = keyframes`
    10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const InputBox = styled(Box)`
    display:flex;
    flex-direction: column;
    border-radius:15px;
    background-color:rgba(0, 191, 255, 0.2);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding:0.5rem;

    .imageInput{
        display:flex;
        align-items: center;
        justify-content: flex-end;
        margin-top:0.5rem;
        padding:0 0.5rem;
    
        .addImgIcon{
            width:32px;
            height:32px;

            @media all and (min-width: 0px) and (max-width:640px){
                width:28px;
                height:28px;
            }
        }

        .fab{
            margin:1rem;
            
            @media all and (min-width: 0px) and (max-width:640px){
                margin:0.2rem;

                .MuiButtonBase-root{
                    width:40px;
                    height:40px;
                }
            }
        }
    }

        .thumbnail{
            display:flex;
            flex-grow:1;
            justify-content: flex-start;

            .image{
                position:relative;
                cursor:pointer;

                img{
                    position:relative;
                    height:3rem;
                    object-fit: contain;
                }
                .removeImgIcon{
                    position:absolute;
                    font-size:1.5rem;
                    top:-0.5rem;
                    right:-0.5rem;
                    color:#ff6961;
                }

                :hover{
                    animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
                    transform: translate3d(0, 0, 0);
                }
            }
        }
    }
`;

export const StyledTextarea = styled.textarea`
    box-sizing: border-box;
    outline:none;
    border:transparent;
    border-radius: 10px;
    box-shadow: 0 2px 3px -0.5px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    width:100%;
    resize:none;
    padding:0.5rem;
    font-size:18px;
    font-family: 'Gowun Batang', serif;

    @media all and (min-width: 0px) and (max-width:640px){
        font-size:0.8rem;
    }
`;