import { accessInstance } from "plugin/axios";
import { CreateCommentType } from "types";

const token = localStorage.getItem("token");

export const getComments = async (postId: number) => {
    try {
        const comments = await accessInstance.get("comment/all", {
            params: { post_id: postId },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return comments;
    } catch (err) {
        throw err
    }
}

export const createComment = async (data: CreateCommentType) => {
    try {
        const result = await accessInstance.post("comment/create", {
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