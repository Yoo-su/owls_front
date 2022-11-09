import { accessInstance } from "plugin/axios"
import { CreatePostType } from "types";

const token = localStorage.getItem("token");

export const getAllPosts = async () => {
    try {
        const result = await accessInstance.get("post/all", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result;
    } catch (err) {

    }
}

export const createNewPost = async (postData: FormData) => {

    try {
        const result = await accessInstance.post("post/create",
            postData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            },
        )

        return result;
    } catch (err) {
        return {
            success: false,
            msg: err
        }
    }
}