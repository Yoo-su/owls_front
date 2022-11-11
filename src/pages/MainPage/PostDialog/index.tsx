import { useState, useEffect } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from "store/hook";
import { setOpenPostDialog } from 'store/slice/postSlice';
import Box from "@mui/material/Box";
import * as Styled from "./styles";
import { createComment, getComments } from 'api/comment';
import { setComments } from 'store/slice/postSlice';
import Comment from './Comment';

interface Props {
    open: boolean;
}
const PostDialog = ({ open }: Props) => {
    const { postDialog_image, postDialog_postId, postDialog_userEmail, comments } = useAppSelector((state) => state.post);
    const { userNickname, userAvatar, userEmail } = useAppSelector((state) => state.user)
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xl');

    const [inputText, setInputText] = useState("");

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setOpenPostDialog(false));
    }

    const handleSubmit = () => {
        const date = new Date();

        createComment({
            comment_text: inputText,
            comment_date: date.toLocaleDateString() + date.toLocaleTimeString(),
            comment_post: postDialog_postId,
            comment_user: userEmail
        }).then(res => {
            dispatch(setComments([res.data[0], ...comments]));
            setInputText("");
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getComments(postDialog_postId).then(res => {
            dispatch(setComments(res.data.comments));
        }).catch((err) => {
            dispatch(setComments([]));
        })
    }, []);

    return (
        <Styled.PostDialog
            open={open}
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleClose}
            scroll='paper'
        >
            <Styled.PostDialogTitle>
                <CloseIcon onClick={handleClose} />
            </Styled.PostDialogTitle>

            <Styled.PostDialogContent>
                {postDialog_image && (
                    <Styled.ImageBox>
                        <img src={postDialog_image} alt="postImage" />
                    </Styled.ImageBox>
                )}

                <Styled.CommentsBox>
                    <Box className="inputField">
                        <Avatar className="userAvatar" src={userAvatar} sx={{ width: 56, height: 56 }} />
                        <Styled.CommentInput
                            placeholder={userNickname.concat(" 님의 댓글을 남겨보세요 😀")}
                            onChange={(e) => { setInputText(e.target.value); }}
                        />

                        <Button
                            className="submitBtn"
                            size='large'
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            <SendIcon />
                        </Button>
                    </Box>

                    <Divider textAlign="left"><Chip label="댓글목록" /></Divider>

                    <Box className="comments">
                        {comments.length > 0 ? comments.map(comment => (
                            <Comment key={comment.comment_id} {...comment} />
                        )) : (<></>)}
                    </Box>
                </Styled.CommentsBox>
            </Styled.PostDialogContent>
        </Styled.PostDialog>
    )
}

export default PostDialog;