import styled from "styled-components";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

export const PostDialog = styled(Dialog)`
    .MuiDialogContent-root{
        padding:0;
    }
`;

export const PostDialogTitle = styled(DialogTitle)`
    display:flex;
    justify-content: flex-end;
    background-color: #3d3935;
    color:#fff;
`;

export const PostDialogContent = styled(DialogContent)`
    display:flex;
    flex-direction: column;
    height:100%;
    font-family: 'Nanum Myeongjo', serif;
`;

export const ImageBox = styled(Box)`
    display:flex;
    justify-content: center;
    height:52rem;
    background-color: #404040;

    img{
        object-fit:contain;
        height:100%;
    }
`;

export const CommentsBox = styled(Box)`
    padding:0.5rem;

    .inputField{
        display:flex;
        align-items:center;
        justify-content:center;
        margin:1rem 0;

        .userAvatar{
            margin-right:1rem;
        }
        .submitBtn{
            margin-left:1rem;
        }
    }

    .comments{
        height:18rem;
        margin:0.5rem 0;
        padding:0 0.5rem;
        background-color: #f5f0f0;
        border-radius: 0.5rem;
        overflow-y:scroll;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        
        ul{
            list-style: none;
            padding:0;
        }
    }
`;

export const CommentInput = styled(TextField)`
    width:50%;
`


interface CommentProps {
    order: number,
    master: boolean,
}
export const UserComment = styled.li<CommentProps>`
    display:flex;
    flex-direction: column;
    width:35%;
    max-width:48%;
    margin:1rem 0;
    border-radius: 1rem;
    ${props => props.master && "margin-left:auto"};
    background-color:${props => props.order === 0 ? 'rgba(0,0,0,0.1)' : props.order === 1 ?
        'rgba(34,140,34,0.1)' : props.order === 2 ? 'rgba(175,128,79,0.1)' : props.order === 3 ? 'rgba(85,170,255,0.1)' : 'rgba(255,210,52,0.1)'};

    .header{
        display:flex;
        align-items:center;
        justify-content: space-between;
        padding:0.3rem 0.5rem;

        .info{
            display:flex;
            align-items: center;
            
            label{
                margin-left:1rem;
                color: rgb(156 163 175);
            }
        }
    }

    .content{
        padding:0.1rem 0.5rem;
    }
`;