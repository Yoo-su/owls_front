import { accessInstance } from "plugin/axios";
import { CreateCommentType } from "types";

const token = localStorage.getItem("token");

export const getComments = async (postId: number) => {
    try {
        const result = await accessInstance.get("https://resolute-planet-367917.du.r.appspot.com/comment/all", {
            params: { post_id: postId },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data;
    } catch (err) {
        throw err
    }
}

export const createComment = async (data: CreateCommentType) => {
    try {
        const result = await accessInstance.post("https://resolute-planet-367917.du.r.appspot.com/comment/create", {
            ...data
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result;
    } catch (err) {
        throw err;
    }
}

export const deleteComment = async (comment_id: number) => {
    try {
        const result = await accessInstance.delete("https://resolute-planet-367917.du.r.appspot.com/comment/delete", {
            data: {
                comment_id
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        )
        return result;
    } catch (err) {
        throw err;
    }
}