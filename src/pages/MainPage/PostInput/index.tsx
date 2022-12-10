import { useState, useRef } from 'react'
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Box from "@mui/material/Box";
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { InputBox, StyledTextarea } from './styles'
import { useAppSelector, useAppDispatch } from "store/hook";
import { createNewPost } from 'api/post';
import { setPosts } from 'store/slice/postSlice';
import useSnack from 'hooks/useSnack';

const PostInput = () => {
    const { userId } = useAppSelector((state) => state.user);
    const { activateSnack } = useSnack();
    const dispatch = useAppDispatch();

    const [imageToPost, setImageToPost] = useState(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const filePickerRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent: any) => {
            setImageToPost(readerEvent.target.result);
        }
    }

    const submitPost = () => {
        if (textareaRef.current?.value === "") {
            alert("내용을 입력해주세요 :)");
            return
        }

        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }

        const date = new Date();
        const formData = new FormData();
        if (filePickerRef?.current?.files) {
            formData.append("file", filePickerRef.current?.files[0]);
        }
        formData.append("post_text", textareaRef.current?.value || "");
        formData.append("post_date", date.toLocaleDateString() + " " + date.toLocaleTimeString());
        userId && formData.append("post_user", userId.toString())

        createNewPost(formData).then((res) => {
            setSuccess(true);
            setLoading(false);
            activateSnack("게시물 등록이 완료되었습니다", "success");
            clearForm();
            removeImage();
            dispatch(setPosts(res.data));
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }).catch(err => {
            activateSnack("오류로 인해 게시물 등록에 실패했습니다", "danger");
            setSuccess(false);
            setLoading(false);
        })
    }

    const removeImage = () => {
        setImageToPost(null);
    }

    const clearForm = () => {
        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
        if (filePickerRef.current) {
            filePickerRef.current.value = "";
        }
        removeImage();
    }


    return (
        <InputBox>

            <StyledTextarea placeholder="공유할 내용을 작성해보세요 :)" rows={5} ref={textareaRef} />

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
                    <ImageIcon className="addImgIcon" />
                </IconButton>
                <Box className="fab" sx={{ position: 'relative', zIndex: 5 }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={submitPost}>
                        {success ? <CheckIcon className="checkIcon" /> : <SendIcon className="sendIcon" />}
                    </Fab>
                    {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
                <input ref={filePickerRef} onChange={addImageToPost} name="file" type="file" hidden accept="image/png, image/jpeg" />
            </div>
        </InputBox>
    )
}

export default PostInput;