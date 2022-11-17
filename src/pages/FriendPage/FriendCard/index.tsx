import * as Styled from "./styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { deleteFriend } from "api/friend";
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";
import { setWatingRequests, setFriends } from "store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hook";

interface Props {
    friend_id: number;
    friend_avatar: string;
    friend_nickname: string;
    created_date?: string;
    updated_date?: string;
}

const FriendCard = ({ friend_id, friend_avatar, friend_nickname, created_date, updated_date }: Props) => {
    const dispatch = useAppDispatch();
    const { waitingRequests, friends } = useAppSelector((state) => state.user);

    const handleClick = () => {
        deleteFriend(friend_id).then(res => {
            if (created_date) {
                dispatch(setWatingRequests(waitingRequests.filter(req => req.friend_id !== friend_id)))
                dispatch(setSnackInfo({
                    message: "요청을 취소했습니다",
                    type: "info"
                }))
                dispatch(setOpenSnack(true));
            }
            else if (updated_date) {
                dispatch(setFriends(friends.filter(friend => friend.friend_id !== friend_id)));
                dispatch(setSnackInfo({
                    message: "삭제되었습니다",
                    type: "info"
                }))
                dispatch(setOpenSnack(true));
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Styled.Wrapper>

            <Box className="avatar">
                <Avatar src={friend_avatar} alt="friend_avatar" sx={{ width: 84, height: 84 }} />

            </Box>


            <Divider orientation="vertical" flexItem></Divider>

            <Box className="info">
                <Tooltip title="프로필" placement="top">
                    <b>{friend_nickname}</b>
                </Tooltip>
                {updated_date && (<label>{updated_date} 등록</label>)}
                {created_date && (<label>{created_date} 요청</label>)}
            </Box>

            <IconButton
                className="deleteBtn"
                onClick={handleClick}
            >
                <DeleteIcon />
            </IconButton>
        </Styled.Wrapper>
    )
}

export default FriendCard