import * as Styled from "./styles";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "store/hook";
import { createFriend } from "api/friend";
import { setSnackInfo, setOpenSnack } from "store/slice/uiSlice";

interface Props {
    user: {
        user_id: number;
        user_nickname: string;
        user_email: string;
        user_name: string;
        user_avatar: string;
    },
    postsCnt: number;
    friendsCnt: number;
    paramId: number;
    loggedInUserId: number | null;
}

const Header = ({ user, postsCnt, friendsCnt, paramId, loggedInUserId }: Props) => {
    const dispatch = useAppDispatch();
    const { friends } = useAppSelector(state => state.user);

    const sendFriendRequest = () => {

        loggedInUserId &&
            createFriend(loggedInUserId, user.user_id).then(res => {
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
        <Styled.UserBox>
            <Box className="head">
                <Box className="basicInfo">
                    <Avatar src={user.user_avatar} sx={{ width: 184, height: 184 }} />
                    <b>{user.user_nickname} 님</b>
                </Box>

                <Box className="info">
                    <Box className="infoItem">
                        <b>게시물</b>
                        <label>{postsCnt}</label>
                    </Box>

                    <Box className="infoItem">
                        <b>친구</b>
                        <label>{friendsCnt}</label>
                    </Box>
                </Box>
            </Box>

            {(paramId !== loggedInUserId) && friends.findIndex(friend => friend.user_id === paramId) === -1 && (
                <IconButton
                    className="addFriendBtn"
                    onClick={sendFriendRequest}>
                    <PersonAddIcon />
                </IconButton>
            )}
        </Styled.UserBox>
    )
}

export default Header