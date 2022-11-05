import { useState, useCallback } from "react";
import { Wrapper, Sidebar, Content, Appbar } from "./styles";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';

const DefaultLayout = () => {
    const [sidebarWidth, setSidebarWidth] = useState(260);
    const [appbarHeight, setAppbarHeight] = useState(70);

    return (
        <Wrapper>
            <Sidebar sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                <div className="sidebarHeader">
                    <img src="/images/owl.png" />
                    <b>Owls</b>
                </div>

                <ul className="sideMenus">
                    <li>
                        <GroupIcon />
                        <b>Friends</b>
                    </li>
                </ul>
            </Sidebar>

            <Appbar sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                <IconButton
                    color="inherit"
                    onClick={() => {
                        if (sidebarWidth === 0) {
                            setSidebarWidth(260);
                        }
                        else {
                            setSidebarWidth(0);
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Appbar>

            <Content sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                content
            </Content>
        </Wrapper>
    )
}

export default DefaultLayout;
