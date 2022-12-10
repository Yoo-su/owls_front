import { Fragment, useState, memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import * as Styled from "./styles";
import { useAppSelector } from "store/hook";
import { createFriend } from "api/friend";
import { useNavigate } from 'react-router-dom';
import useSnack from "hooks/useSnack";

interface Props {
    source: string;
    isFriendPost: number | undefined;
    authorId: number;
}
const AvatarMenu = ({ source, isFriendPost, authorId }: Props) => {
    const navigate = useNavigate();
    const { userId } = useAppSelector((state) => state.user);
    const { activateSnack } = useSnack();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const sendFriendRequest = () => {
        userId &&
            createFriend(userId, authorId).then(res => {
                if (res.data.message) {
                    activateSnack(res.data.message, "info");
                } else {
                    activateSnack("친구요청을 전송했습니다", "info");
                }

            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <Fragment>
            <Avatar
                src={source}
                alt=''
                sx={{ width: 56, height: 56 }}

                onClick={handleClick}
            />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableAutoFocusItem={true}
            >
                <MenuItem onClick={() => {
                    navigate(`/profile/${authorId}`)
                }}><Styled.Label>프로필</Styled.Label></MenuItem>
                {(isFriendPost === -1) && (<MenuItem onClick={sendFriendRequest}><Styled.Label>친구추가</Styled.Label></MenuItem>)}
            </Menu>
        </Fragment>
    )
}

export default memo(AvatarMenu);