import { memo, useState } from "react";
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { PostBox } from "./styles"
import { PostType } from "types"
import { useAppDispatch, useAppSelector } from "store/hook";
import { setPostDialogInfo, setOpenPostDialog } from "store/slice/postSlice";
import { deletePost } from "api/post";
import { setOpenSnack, setSnackInfo } from "store/slice/uiSlice";
import { setPosts } from "store/slice/postSlice";

const Post = ({ post_id, post_text, post_image, post_date, user_email, user_nickname, user_avatar }: PostType) => {
    const dispatch = useAppDispatch();
    const { userEmail } = useAppSelector((state) => state.user);
    const { posts } = useAppSelector((state) => state.post);

    const handleClick = () => {
        dispatch(setPostDialogInfo({
            postDialog_image: post_image,
            postDialog_postId: post_id,
            postDialog_userEmail: user_email,
        }))
        dispatch(setOpenPostDialog(true));
    }

    const handleDelete = () => {
        deletePost(post_id).then(res => {
            dispatch(setPosts(posts.filter(post => post.post_id !== post_id)));
            dispatch(setSnackInfo({
                message: "게시물이 삭제되었습니다",
                type: "info"
            }))
            dispatch(setOpenSnack(true));
        }).catch((err) => {
            dispatch(setSnackInfo({
                message: "게시물 삭제중 오류가 발생했습니다",
                type: "danger"
            }))
            dispatch(setOpenSnack(true));
        })
    }

    return (
        <PostBox>
            <div className="postHeader">
                <div className="profileImg">
                    <Avatar
                        alt=""
                        src={user_avatar}
                        sx={{ width: 56, height: 56 }}
                    />
                </div>

                <div className="postInfo">
                    <label className="author">{user_nickname}</label>
                    <label className="postedDate">{post_date}</label>
                </div>

                {(user_email === userEmail) && (
                    <IconButton className="deleteBtn" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </div>

            <div className="postContent" onClick={handleClick}>
                {post_image && (
                    <div className="postImage">
                        <img src={post_image} alt='' loading="lazy" />
                    </div>
                )}
                <div className="postText">
                    <p>{post_text}</p>
                </div>
            </div>
        </PostBox>
    )
}

export default memo(Post);