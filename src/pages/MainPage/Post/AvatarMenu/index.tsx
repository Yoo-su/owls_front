import { Fragment, useState, memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import * as Styled from "./styles";
import { useAppSelector, useAppDispatch } from "store/hook";
import { createFriend } from "api/friend";
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";

interface Props {
    source: string;
    isFriendPost: number;
    authorEmail: string;
}
const AvatarMenu = ({ source, isFriendPost, authorEmail }: Props) => {
    const { userEmail } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const sendFriendRequest = () => {
        createFriend(userEmail, authorEmail).then(res => {
            if (res.data.message) {
                dispatch(setSnackInfo({
                    message: res.data.message,
                    type: "info"
                }));
                dispatch(setOpenSnack(true));
            } else {
                dispatch(setSnackInfo({
                    message: "친구요청을 전송했습니다",
                    type: "info"
                }))
                dispatch(setOpenSnack(true));
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
                <MenuItem onClick={handleClose}><Styled.Label>프로필</Styled.Label></MenuItem>
                {(isFriendPost === -1) && (<MenuItem onClick={sendFriendRequest}><Styled.Label>친구추가</Styled.Label></MenuItem>)}
            </Menu>
        </Fragment>
    )
}

export default memo(AvatarMenu);