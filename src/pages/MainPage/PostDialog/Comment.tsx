import { memo } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserComment } from "./styles";
import { CommentType } from "types";
import { useAppSelector } from "store/hook";

const Comment = ({ comment_id, comment_date, comment_text, user_email, user_avatar, user_nickname }: CommentType) => {
    const { userEmail } = useAppSelector((state) => state.user);

    return (
        <UserComment order={comment_id} master={userEmail === user_email}>
            <div className="header">
                <div className="info">
                    <Chip label={user_nickname} avatar={<Avatar src={user_avatar} />} />
                    <label>{comment_date}</label>
                </div>

                {(userEmail === user_email) && (
                    <IconButton>
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