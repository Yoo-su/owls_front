import { instance, accessInstance } from "plugin/axios";

const token = localStorage.getItem("token");

export const signin = async (user_email: FormDataEntryValue, user_password: FormDataEntryValue) => {
    try {
        const result = await instance.post("https://resolute-planet-367917.du.r.appspot.com/auth/signin", {
            user_email,
            user_password
        })
        return result
    } catch (err) {
        throw err
    }

}

export const signup = async (user_name: FormDataEntryValue, user_nickname: FormDataEntryValue, user_email: FormDataEntryValue, user_password: FormDataEntryValue) => {
    try {
        const result = await instance.post("https://resolute-planet-367917.du.r.appspot.com/user/signup", {
            user_name,
            user_nickname,
            user_email,
            user_password
        })

        return result;
    } catch (err) {
        throw err
    }
}

export const getProfile = async (user_id: number) => {
    try {
        const result = await accessInstance.get("https://resolute-planet-367917.du.r.appspot.com/user/profile", {
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