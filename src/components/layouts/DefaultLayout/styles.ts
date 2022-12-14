import styled from "styled-components";

export const Wrapper = styled.div`
`;

interface Prop {
    sidebarWidth: number;
    appbarHeight: number;
}
export const Sidebar = styled.div<Prop>`
    position:fixed;
    top:0;
    width:${prop => prop.sidebarWidth}px;
    height:100vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    overflow:hidden;
    transition:width 0.3s ease-in-out;
    border-right:0.5px solid rgba(0,0,0,0.1);
    background-color: rgba(0,0,0,0.1);
    
    .sidebarHeader{
        display:flex;
        width:100%;
        justify-content: center;
        height:${prop => prop.appbarHeight}px;
        align-items: center;
        font-family: 'Island Moments', cursive;
        font-size: 48px;
        border-bottom:0.5px solid rgba(0,0,0,0.1);
        
        img{
            width:32px;
            margin-right:0.2rem;
        }
    }

    .sideMenus{
        display:flex;
        flex-direction: column;
        list-style: none;
        padding:0;
        font-family: 'Gowun Dodum', sans-serif;
        width:100%;
        
    }
    @media all and (min-width: 0px) and (max-width:640px) {
        display:none;
    }
`;

interface LinkTabProps {
    active: boolean;
}
export const LinkTab = styled.li<LinkTabProps>`
            display:flex;
            align-items: center;
            cursor:pointer;
            justify-content: center;
            padding:1rem 0;
            margin:0.1rem 0.5rem;
            border-radius:10px;
            ${props => props.active && "color:#0E86FE;"}
            ${props => props.active && "background-color:#F3F6F9;"}
            .MuiSvgIcon-root{
                width:35px;
                height:35px;
                margin-right:1rem;
            }

            b{
                white-space: nowrap;
                font-size:18px;
            }

            :hover{
                ${props => !props.active && "background-color:rgba(0,0,0,0.1);"}
            }
`;

export const Content = styled.main<Prop>`
    margin-left:${prop => prop.sidebarWidth}px;
    margin-top:${prop => prop.appbarHeight}px;
    padding:1rem;
    transition:all 0.3s ease-in-out;
    background-color:#f9f6f2;
    min-height:100vh;

    @media all and (min-width: 0px) and (max-width:640px) {
        margin-left:0;
    }
`;

export const Appbar = styled.div<Prop>`
    position:fixed;
    z-index:10;
    top:0;
    width:calc(100% - ${prop => prop.sidebarWidth}px);
    margin-left:${prop => prop.sidebarWidth}px;
    height:${prop => prop.appbarHeight}px;
    background-color: #5b5555;
    display:flex;
    align-items: center;
    padding:0 0.5rem;
    color:white;
    transition:all 0.3s ease-in-out;

    .currentUser{
        flex-grow:1;
        display:flex;
        justify-content: flex-end;
        padding:0 2rem;

        .MuiChip-root{
            background-color: white;
        }
        
        .MuiListItem-root{
            font-size:8px;
        }
    }

    @media all and (min-width: 0px) and (max-width:640px) {
        margin-left:0;
        width:100%;
    }
`;