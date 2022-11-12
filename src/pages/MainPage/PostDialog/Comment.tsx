import { memo } from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserComment } from "./styles";
import { CommentType } from "types";
import { useAppSelector, useAppDispatch } from "store/hook";
import { setComments } from "store/slice/postSlice";
import { deleteComment } from "api/comment";
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";

const Comment = ({ comment_id, comment_date, comment_text, user_email, user_avatar, user_nickname }: CommentType) => {
    const { userEmail } = useAppSelector((state) => state.user);
    const { comments } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        deleteComment(comment_id).then(res => {
            dispatch(setComments(comments.filter(comment => comment.comment_id !== comment_id)));
            dispatch(setSnackInfo({
                message: "댓글 삭제가 완료되었습니다",
                type: "info"
            }))
            dispatch(setOpenSnack(true));
        }).catch((err) => {
            console.log(err);
            dispatch(setSnackInfo({
                message: "오류로 인해 삭제 실패했습니다",
                type: "danger"
            }));
            dispatch(setOpenSnack(true));
        })
    }

    return (
        <UserComment order={comment_id % 5} master={userEmail === user_email}>
            <div className="header">
                <div className="info">
                    <Avatar src={user_avatar} sx={{ width: 52, height: 52 }} />
                    <b>{user_nickname}</b>
                    <label>{comment_date}</label>
                </div>

                {(userEmail === user_email) && (
                    <IconButton className="deleteBtn" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </div>

            <Divider></Divider>

            <div className="content">
                <p>{comment_text}</p>
            </div>
        </UserComment>
    )
}

export default memo(Comment);