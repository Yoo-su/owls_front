import { useState, useRef } from 'react'
import SnackAlert from 'components/common/SnackAlert';
import IconButton from "@mui/material/IconButton";
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { InputBox, StyledTextarea } from './styles'
import { useAppSelector, useAppDispatch } from "store/hook";
import { createNewPost } from 'api/post';
import { setPosts } from 'store/slice/postSlice';

const PostInput = () => {
    const { userEmail } = useAppSelector((state) => state.user);
    const { posts } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();

    /* 스낵바 알림 관련 */
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "danger" | "info">("success");
    const [alertMsg, setAlertMsg] = useState("");

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

    const submitPost = () => {
        if (textareaRef.current?.value === "") {
            alert("내용을 입력해주세요 :)");
            return
        }

        const date = new Date();
        const formData = new FormData();
        if (filePickerRef?.current?.files) {
            formData.append("file", filePickerRef.current?.files[0]);
        }
        formData.append("post_text", textareaRef.current?.value || "");
        formData.append("post_date", date.toLocaleDateString() + date.toLocaleTimeString());
        formData.append("post_user", userEmail)

        createNewPost(formData).then((res: any) => {
            console.log(res)
            if (res.data.success == true) {
                setAlertMsg("게시물 등록이 완료되었습니다");
                setAlertType("info");
                setOpenAlert(true);
                clearForm();
                removeImage();
                dispatch(setPosts([res.data.entity, ...posts]));
            }
            else {
                setAlertMsg("오류로 인해 게시물 등록에 실패했습니다");
                setAlertType("danger");
                setOpenAlert(true);
            }
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
                    <ImageIcon className="addImgIcon" fontSize='large' />
                </IconButton>
                <IconButton onClick={submitPost}>
                    <SendIcon color='primary' fontSize="large" />
                </IconButton>
                <input ref={filePickerRef} onChange={addImageToPost} name="file" type="file" hidden accept="image/png, image/jpeg" />
            </div>

            <SnackAlert open={openAlert} setOpen={setOpenAlert} alertType={alertType} msg={alertMsg} />
        </InputBox>
    )
}

export default PostInput;