import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { PostBox } from "./styles"
import { PostType } from "types"

const Post = ({ post_id, post_text, post_image, post_date, user_email, user_nickname, user_image }: PostType) => {
    return (
        <PostBox>
            <div className="postHeader">
                <div className="profileImg">
                    <Avatar
                        alt=""
                        src={user_image}
                        sx={{ width: 56, height: 56 }}
                    />
                </div>

                <div className="postInfo">
                    <label className="author">{user_nickname}</label>
                    <label className="postedDate">{post_date}</label>
                </div>
            </div>

            <div className="postContent">
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

export default Post