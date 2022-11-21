import styled from "styled-components";
import Box from "@mui/material/Box";

export const LoadingBox = styled(Box)`
    display:flex;
    justify-content:center;
    align-items: center;
    margin-top:10rem;
`;

export const RequestsBox = styled(Box)`
    display:flex;
    flex-direction:column;
    margin-top:1rem;
    .cards{
        display:flex;
        flex-wrap:wrap;
        margin-top:1.5rem;

        @media all and (min-width: 0px) and (max-width:640px){
            flex-direction: column;
            align-items: center;
        }
    }
`;

export const FriendsBox = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-top:5rem;

    .cards{
        display:flex;
        flex-wrap:wrap;
        margin-top:1.5rem;

        @media all and (min-width: 0px) and (max-width:640px){
            flex-direction: column;
            align-items: center;
        }
    }
`;

export const NoContentBox = styled(Box)`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin-top:1.5rem;

    .MuiSvgIcon-root{
        width:100px;
        height:100px;
    }
`;