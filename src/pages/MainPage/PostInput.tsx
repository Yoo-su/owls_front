import { useState, useRef } from 'react'
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { InputBox, StyledTextarea } from './styles'

const PostInput = () => {
    const [imageToPost, setImageToPost] = useState(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const filePickerRef = useRef<HTMLInputElement | null>(null);

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent: any) => {
            setImageToPost(readerEvent.target.result);
        }
    }

    const removeImage = () => {
        setImageToPost(null);
    }

    return (
        <InputBox>
            <form>
                <StyledTextarea placeholder="공유할 내용을 작성해보세요 :)" rows={5} ref={textareaRef} />

            </form>
            <div className="imageInput">
                {imageToPost && (
                    <div className="thumbnail">
                        <div className="image" onClick={removeImage}>
                            <img src={imageToPost} alt='' />
                            <DoDisturbOnIcon className="removeImgIcon" />
                        </div>
                    </div>
                )}
                <IconButton onClick={() => {
                    filePickerRef.current?.click();
                }}>
                    <ImageIcon className="addImgIcon" fontSize='large' />
                </IconButton>
                <input ref={filePickerRef} onChange={addImageToPost} type="file" hidden accept="image/png, image/jpeg" />
            </div>

        </InputBox>
    )
}

export default PostInput;