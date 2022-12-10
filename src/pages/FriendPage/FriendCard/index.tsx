import * as Styled from "./styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { deleteFriend } from "api/friend";
import { setWatingRequests, setFriends } from "store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { useNavigate } from "react-router-dom";
import useSnack from "hooks/useSnack";

interface Props {
    friend_id: number;
    friend_user_id: number;
    friend_user_avatar: string;
    friend_user_nickname: string;
    created_date?: string;
    updated_date?: string;
}

const FriendCard = ({ friend_id, friend_user_id, friend_user_avatar, friend_user_nickname, created_date, updated_date }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { waitingRequests, friends } = useAppSelector((state) => state.user);
    const { activateSnack } = useSnack();

    const handleClick = () => {
        deleteFriend(friend_id).then(res => {
            if (created_date) {
                dispatch(setWatingRequests(waitingRequests.filter(req => req.friend_id !== friend_id)))
                activateSnack("요청을 취소했습니다", "info");
            }
            else if (updated_date) {
                dispatch(setFriends(friends.filter(friend => friend.friend_id !== friend_id)));
                activateSnack("삭제되었습니다", "info");
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Styled.Wrapper>

            <Box className="avatar">
                <Avatar src={friend_user_avatar} alt="friend_avatar" sx={{ width: 84, height: 84 }} />

            </Box>


            <Divider orientation="vertical" flexItem></Divider>

            <Box className="info">
                <Tooltip title="프로필" placement="top">
                    <b onClick={() => {
                        navigate(`/profile/${friend_user_id}`)
                    }}>{friend_user_nickname}</b>
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