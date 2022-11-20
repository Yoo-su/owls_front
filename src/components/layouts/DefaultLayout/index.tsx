import { useState, memo } from "react";
import { Wrapper, Sidebar, Content, Appbar, LinkTab } from "./styles";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserChip from "./UserChip";
import Notification from "./Notification";
import { useAppSelector } from "store/hook";
import { useNavigate, useLocation } from "react-router-dom";
import PostDialog from "pages/MainPage/PostDialog";

interface DefaultLayoutProps {
    children: React.ReactElement;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const { userNickname, userAvatar, userId } = useAppSelector((state) => state.user);
    const { openPostDialog } = useAppSelector(state => state.post);
    const [sidebarWidth, setSidebarWidth] = useState(260);
    const [appbarHeight, setAppbarHeight] = useState(70);

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Wrapper>
            <Sidebar sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                <div className="sidebarHeader">
                    <img src="/images/owl.png" />
                    <b>Owls</b>
                </div>

                <ul className="sideMenus">
                    <LinkTab
                        onClick={() => {
                            navigate("/");
                        }}
                        active={location.pathname === "/"}
                    >
                        <DashboardIcon />
                        <b>메인</b>
                    </LinkTab>

                    <LinkTab
                        onClick={() => {
                            navigate("/friend");
                        }}
                        active={location.pathname === "/friend"}
                    >
                        <GroupIcon />
                        <b>친구목록</b>
                    </LinkTab>
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
                    <UserChip profileImg={userAvatar} nickname={userNickname} userId={userId} />
                </div>

            </Appbar>

            <Content sidebarWidth={sidebarWidth} appbarHeight={appbarHeight}>
                {children}
            </Content>

            {openPostDialog && (<PostDialog open={openPostDialog} />)}
        </Wrapper>
    )
}

export default memo(DefaultLayout);
