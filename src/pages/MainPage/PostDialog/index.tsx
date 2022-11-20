import { useState, useEffect } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import Divider from "@mui/material/Divider";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import { useAppDispatch, useAppSelector } from "store/hook";
import { setOpenPostDialog } from 'store/slice/postSlice';
import Box from "@mui/material/Box";
import * as Styled from "./styles";
import { createComment } from 'api/comment';
import { get_comments } from 'store/asyncThunks';
import { setComments, setCommentsLoading } from 'store/slice/postSlice';
import Comment from './Comment';
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";

interface Props {
    open: boolean;
}
const PostDialog = ({ open }: Props) => {
    const { postDialog_image, postDialog_postId, postDialog_text, postDialog_userEmail, comments, commentsLoading } = useAppSelector((state) => state.post);
    const { userNickname, userAvatar, userId } = useAppSelector((state) => state.user)
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');

    const [inputText, setInputText] = useState("");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setCommentsLoading(true));
        dispatch(setOpenPostDialog(false));
    }

    const handleSubmit = () => {
        const date = new Date();

        (postDialog_postId && userId) && createComment({
            comment_text: inputText,
            comment_date: date.toLocaleDateString() + date.toLocaleTimeString(),
            comment_post: postDialog_postId,
            comment_user: userId
        }).then(res => {
            dispatch(setSnackInfo({
                message: "댓글이 등록되었습니다",
                type: "success"
            }));
            dispatch(setOpenSnack(true));
            dispatch(setComments(res.data));
            setInputText("");
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        postDialog_postId && dispatch(get_comments(postDialog_postId));
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
                <CloseIcon className="closeIcon" onClick={handleClose} />
            </Styled.PostDialogTitle>

            <Styled.PostDialogContent>
                {postDialog_image && (
                    <Styled.ImageBox>
                        <img src={postDialog_image} alt="postImage" loading='lazy' />
                    </Styled.ImageBox>
                )}

                <Styled.TextBox>
                    <p>{postDialog_text}</p>
                </Styled.TextBox>

                <Styled.CommentsBox>
                    <Box className="inputField">
                        <Avatar className="userAvatar" src={userAvatar} />
                        <Styled.CommentInput
                            placeholder={userNickname.concat(" 님의 댓글을 남겨보세요 😀")}
                            onChange={(e) => { setInputText(e.target.value); }}
                            value={inputText}
                            size="medium"
                        />

                        <IconButton
                            className="submitBtn"
                            size='large'
                            onClick={handleSubmit}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>

                    <Divider textAlign="left">{comments.length}개의 댓글</Divider>

                    <Box className="comments">
                        {commentsLoading ? (
                            <Styled.LoadingBox>
                                <CircularProgress size={150} />
                            </Styled.LoadingBox>
                        ) :
                            comments.length > 0 ? comments.map(comment => (
                                <Comment key={comment.comment_id} {...comment} />
                            )) : (
                                <div className="noComments">
                                    <MessageIcon />
                                    <label>댓글을 남겨보세요</label>
                                </div>)}
                    </Box>
                </Styled.CommentsBox>
            </Styled.PostDialogContent>
        </Styled.PostDialog>
    )
}

export default PostDialog;