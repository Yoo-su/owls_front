import { Fragment, useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from "@mui/material/Avatar";
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import * as Styled from "./styles";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppDispatch, useAppSelector } from "store/hook";
import { setFriendRequests, setFriends } from "store/slice/userSlice";
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";
import { makeFriend, deleteFriend } from "api/friend";
import { get_friend_requests } from "store/asyncThunks";

const Notification = () => {
    const dispatch = useAppDispatch();
    const { friendRequests, friends, userEmail } = useAppSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccept = (friend_id: number) => {

        makeFriend(friend_id).then(res => {
            dispatch(setFriends([...friends, res.data]));
            dispatch(setFriendRequests(friendRequests.filter(req => req.friend_id != friend_id)));
            dispatch(setSnackInfo({
                message: "친구가 등록되었습니다",
                type: "success"
            }))
            dispatch(setOpenSnack(true));
        }).catch(err => {
            dispatch(setSnackInfo({
                message: `오류가 발생했습니다`,
                type: "danger"
            }))
            dispatch(setOpenSnack(true));
        })

    }
    const handleReject = (friend_id: number) => {
        deleteFriend(friend_id).then(res => {
            dispatch(setFriendRequests(friendRequests.filter(req => req.friend_id != friend_id)));
            dispatch(setSnackInfo({
                message: "요청을 삭제했습니다",
                type: "info"
            }))
            dispatch(setOpenSnack(true));
        }).catch(err => {
            dispatch(setSnackInfo({
                message: `오류가 발생했습니다`,
                type: "danger"
            }))
        })
    }

    const getFunction = () => {
        dispatch(get_friend_requests(userEmail));
    }

    useEffect(() => {
        getFunction();
        const interval = setInterval(getFunction, 20000);

        return () => clearInterval(interval);
    }, [userEmail]);

    return (
        <Fragment>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Badge
                    badgeContent={friendRequests.length}
                    color="primary"
                >
                    <NotificationsIcon sx={{ color: "#f3c543" }} />
                </Badge>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {friendRequests.length > 0 ? friendRequests.map(request => (
                    <MenuItem key={request.friend_id} sx={{ cursor: "default" }}>
                        <Styled.ItemBox>
                            <Avatar className="avatar" src={request.user_avatar} sx={{ width: 32, height: 32 }} />
                            <p className="message"><b>{request.user_nickname}</b>님이 친구요청을 보냈습니다</p>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                aria-label="Disabled elevation buttons"
                            >
                                <IconButton onClick={() => handleAccept(request.friend_id)}><CheckIcon sx={{ color: "#0D80D8" }} /></IconButton>
                                <IconButton onClick={() => handleReject(request.friend_id)}><CloseIcon sx={{ color: "#de5246" }} /></IconButton>
                            </ButtonGroup>
                        </Styled.ItemBox>
                    </MenuItem>
                )) : (
                    <MenuItem>
                        <Styled.NoItemMsg>표시할 내용이 없습니다</Styled.NoItemMsg>
                    </MenuItem>)}

            </Menu>
        </Fragment>
    )
}

export default Notification;