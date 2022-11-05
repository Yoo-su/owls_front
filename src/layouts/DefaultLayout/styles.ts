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
        font-size: 32px;
        border-bottom:0.5px solid rgba(0,0,0,0.1);
        
        img{
            width:32px;
            margin-right:0.2rem;
        }
    }

    .sideMenus{
        list-style: none;
        padding:0;
        font-family: 'Roboto Slab', serif;
        width:100%;
        li{
            display:flex;
            align-items: center;
            cursor:pointer;
            justify-content: center;
            
            .MuiSvgIcon-root{
                width:35px;
                height:35px;
                margin-right:1rem;
            }

            b{
                font-size:18px;
            }

            :hover{
                background-color: rgba(0,0,0,0.3);
            }
        }
    }

`;

export const Content = styled.main<Prop>`
    margin-left:${prop => prop.sidebarWidth}px;
    margin-top:${prop => prop.appbarHeight}px;
    padding:1rem;
    transition:all 0.3s ease-in-out;
`;

export const Appbar = styled.div<Prop>`
    position:fixed;
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
`;