import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { PostBox } from "./styles"
import { PostType } from "types"

const Post = ({ author, authorProfileImg, postText, postImage = "", postedDate }: PostType) => {
    return (
        <PostBox>
            <div className="postHeader">
                <div className="profileImg">
                    <Avatar
                        alt=""
                        src={authorProfileImg}
                        sx={{ width: 56, height: 56 }}
                    />
                </div>

                <div className="postInfo">
                    <label className="author">{author}</label>
                    <label className="postedDate">{postedDate}</label>
                </div>
            </div>

            <div className="postContent">
                {postImage && (
                    <div className="postImage">
                        <img src={postImage} alt='' loading="lazy" />
                    </div>
                )}
                <div className="postText">
                    <p>{postText}</p>
                </div>
            </div>
        </PostBox>
    )
}

export default Post