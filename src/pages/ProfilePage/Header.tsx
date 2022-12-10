import * as Styled from "./styles";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "store/hook";
import { createFriend } from "api/friend";
import useSnack from "hooks/useSnack";

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
    const { friends } = useAppSelector(state => state.user);
    const { activateSnack } = useSnack();

    const sendFriendRequest = () => {

        loggedInUserId &&
            createFriend(loggedInUserId, user.user_id).then(res => {
                if (res.data.message) {
                    activateSnack(res.data.message, "info");
                } else {
                    activateSnack("친구요청을 전송했습니다", "info");
                }

            }).catch(err => {
                console.log(err)
                activateSnack("오류가 발생했습니다", "danger");
            })
    }

    return (
        <Styled.UserBox>
            <Box className="head">
                <Box className="basicInfo">
                    <Avatar className="avatar" src={user.user_avatar} />
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