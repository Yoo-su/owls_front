import React from 'react'
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import { InputBox, StyledTextarea } from './styles'

const PostInput = () => {
    return (
        <InputBox>
            <form>
                <StyledTextarea placeholder="공유할 내용을 작성해보세요 :)" rows={5} />

            </form>
            <div className="utilBtns">
                <IconButton>
                    <ImageIcon fontSize='large' />
                </IconButton>
            </div>

        </InputBox>
    )
}

export default PostInput;