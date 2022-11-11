import { memo, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { PostBox } from "./styles"
import { PostType } from "types"
import { useAppDispatch } from "store/hook";
import { setPostDialogInfo, setOpenPostDialog } from "store/slice/postSlice";

const Post = ({ post_id, post_text, post_image, post_date, user_email, user_nickname, user_avatar }: PostType) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setPostDialogInfo({
            postDialog_image: post_image,
            postDialog_postId: post_id,
            postDialog_userEmail: user_email,
        }))
        dispatch(setOpenPostDialog(true));
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