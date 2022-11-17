import { useEffect, Fragment } from "react";
import FriendCard from "./FriendCard";
import * as Styled from "./styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useAppSelector, useAppDispatch } from "store/hook";
import { get_wating_requests } from "store/asyncThunks";

const FriendPage = () => {
    const { friends, userEmail, waitingRequests, loading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (userEmail) {
            dispatch(get_wating_requests(userEmail));
        }
    }, [userEmail])

    return (
        <Container sx={{
            fontFamily: "Gowun Dodum"
        }}>
            {loading ? (
                <Styled.LoadingBox>
                    <CircularProgress size={150} />
                </Styled.LoadingBox>
            ) : (
                <Fragment>
                    <Styled.RequestsBox>
                        <Divider textAlign="left"><b>대기중인 {waitingRequests.length}개의 친구요청</b></Divider>
                        {waitingRequests.length === 0 && (
                            <Styled.NoContentBox>
                                <SentimentSatisfiedAltIcon />
                                <p>대기중인 요청이 없습니다</p>
                            </Styled.NoContentBox>
                        )}
                        <Box className="cards">
                            {waitingRequests.map(friend => (
                                <FriendCard
                                    key={friend.friend_id}
                                    friend_id={friend.friend_id}
                                    friend_avatar={friend.user_avatar}
                                    friend_nickname={friend.user_nickname}
                                    created_date={friend.created_date}
                                />
                            ))}
                        </Box>
                    </Styled.RequestsBox>

                    <Styled.FriendsBox>
                        <Divider textAlign="left"><b>{friends.length}명의 친구</b></Divider>

                        <Box className="cards" >
                            {friends.map(friend => (
                                <FriendCard
                                    key={friend.friend_id}
                                    friend_id={friend.friend_id}
                                    friend_avatar={friend.user_avatar}
                                    friend_nickname={friend.user_nickname}
                                    updated_date={friend.updated_date} />
                            ))}
                        </Box>

                        {friends.length === 0 && (
                            <Styled.NoContentBox>
                                <SentimentSatisfiedAltIcon />
                                <p>친구를 추가해보세요 :)</p>
                            </Styled.NoContentBox>
                        )}

                    </Styled.FriendsBox>
                </Fragment>
            )}

        </Container >
    )
}

export default FriendPage