import { accessInstance } from "plugin/axios"

const token = localStorage.getItem("token");

export const getAllPosts = async () => {
    try {
        const result = await accessInstance.get("post/all", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result
    }
    catch (err) {
        throw err
    }
}

export const createNewPost = async (postData: FormData) => {

    try {
        const result = await accessInstance.post("post/create",
            postData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
        )

        return result;
    }
    catch (err) {
        throw err
    }
}

export const deletePost = async (post_id: number) => {
    try {
        const result = accessInstance.delete("post/delete", {
            data: {
                post_id
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result;
    } catch (err) {
        throw err;
    }
}