import { accessInstance } from "plugin/axios"

const token = localStorage.getItem("token");

export const getAllPosts = async () => {
    try {
        const result = await accessInstance.get("https://resolute-planet-367917.du.r.appspot.com/post/all", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data;
    }
    catch (err) {
        throw err
    }
}

export const getFriendPosts = async (user_id: number) => {
    try {
        const result = await accessInstance.get("https://resolute-planet-367917.du.r.appspot.com/post/friend", {
            params: { user_id: user_id },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data
    }
    catch (err) {
        throw err
    }
}


export const createNewPost = async (postData: FormData) => {

    try {
        const result = await accessInstance.post("https://resolute-planet-367917.du.r.appspot.com/post/create",
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
        const result = accessInstance.delete("https://resolute-planet-367917.du.r.appspot.com/post/delete", {
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
