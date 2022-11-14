import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

export const ItemBox = styled(Box)`
    display:flex;
    align-items:center;
    
    .message{
        margin-left:0.5rem;
        font-size:0.8rem;
    }
`;

export const NoItemMsg = styled.p`
    font-size:0.8rem;
    color:rgb(156 163 175);
`;