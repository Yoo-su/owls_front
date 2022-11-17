import { useState, memo } from "react";
import { Wrapper, Sidebar, Content, Appbar } from "./styles";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import UserChip from "./UserChip";
import Notification from "./Notification";
import { useAppSelector } from "store/hook";
import { useNavigate } from "react-router-dom";

interface DefaultLayoutProps {
    children: React.ReactElement;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const user = useAppSelector((state) => state.user);

    const [sidebarWidth, setSidebarWidth] = useState(260);
    const [appbarHeight, setAppbarHeight] = useState(70);

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Sidebar sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                <div className="sidebarHeader" onClick={() => {
                    navigate("/");
                }}>
                    <img src="/images/owl.png" />
                    <b>Owls</b>
                </div>

                <ul className="sideMenus">
                    <li onClick={() => {
                        navigate("/friend");
                    }}>
                        <GroupIcon />
                        <b>친구목록</b>
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

                <Notification />

                <div className="currentUser">
                    <UserChip profileImg={user.userAvatar} nickname={user.userNickname} />
                </div>

            </Appbar>

            <Content sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                {children}
            </Content>
        </Wrapper>
    )
}

export default memo(DefaultLayout);
