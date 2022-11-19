import { accessInstance } from "plugin/axios";

const token = localStorage.getItem("token");

export const createFriend = async (friend_source: number, friend_target: number) => {
    try {
        const date = new Date();
        const created_date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const result = await accessInstance.post("/friend/create", {
            friend_source,
            friend_target,
            created_date
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

export const makeFriend = async (friend_id: number) => {
    try {
        const date = new Date();
        const updated_date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const result = accessInstance.patch("/friend/make",
            {
                friend_id,
                updated_date
            }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result;
    } catch (err) {
        throw err
    }
}

export const deleteFriend = async (friend_id: number) => {
    try {
        const result = await accessInstance.delete("/friend/delete", {
            data: {
                friend_id
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

export const getFriends = async (user_id: number) => {
    try {
        const result = await accessInstance.get("/friend/list", {
            params: { user_id: user_id },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data;
    } catch (err) {
        throw err;
    }
}

export const getFriendRequests = async (user_id: number) => {
    try {
        const result = await accessInstance.get("/friend/request-list", {
            params: { friend_target: user_id },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return result.data;
    } catch (err) {
        throw err;
    }
}

export const getMyRequests = async (user_id: number) => {
    try {
        const result = await accessInstance.get("/friend/my-requests", {
            params: { user_id: user_id },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return result.data;
    } catch (err) {
        throw err;
    }
}