import { useState, MouseEvent, Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Face5Icon from '@mui/icons-material/Face5';
import { useNavigate } from "react-router-dom";

interface Prop {
    profileImg: string;
    nickname: string;
}

const UserChip = ({ profileImg, nickname }: Prop) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Chip
                avatar={<Avatar alt="profile" src={profileImg} />}
                label={nickname}
                clickable
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    navigate("/profile")
                }}>
                    <Face5Icon />&nbsp;내 프로필
                </MenuItem>
                <MenuItem onClick={() => {
                    localStorage.clear();
                    window.location.href = "/signin";
                }}><LogoutIcon />&nbsp;로그아웃</MenuItem>
            </Menu>
        </Fragment>
    );
}

export default UserChip;