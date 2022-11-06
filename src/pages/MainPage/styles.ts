import styled from "styled-components";
import { Box } from '@mui/material'

export const InputBox = styled(Box)`
    display:flex;
    flex-direction: column;
    border-radius:15px;
    background-color:#fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding:0.5rem;

    .utilBtns{
        display:flex;
        align-items: center;
        justify-content: flex-end;
        margin:0.5rem 1rem;
    }
`;

export const StyledTextarea = styled.textarea`
    box-sizing: border-box;
    outline:none;
    border:transparent;
    border-radius: 5px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    width:100%;
    resize:none;
    padding:0.5rem;
    font-size:18px;
    font-family: 'Gowun Batang', serif;
`;