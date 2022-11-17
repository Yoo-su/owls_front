import styled from "styled-components";
import Box from "@mui/material/Box";

export const Wrapper = styled(Box)`
    display:flex;
    position:relative;
    background-color:#fff;
    border-radius:1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding:0.5rem 0;
    margin:1rem;
    width:fit-content;
    
    .avatar{
        padding:1rem;
    }

    .info{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:flex-start;
        flex-grow:1;
        padding:0.5rem 1rem;
        white-space: nowrap;

        b{
            cursor:pointer;
        }

        label{
            font-size:0.8rem;
            color: rgb(156 163 175);
        }
    }

    .deleteBtn{
            position:absolute;
            top:0.1rem;
            right: 0.2rem;

            :hover{
                .MuiSvgIcon-root{
                    color: #9b1c31;
                }
            }
        }
`;
