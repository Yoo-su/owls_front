import { instance } from "plugin/axios";

export const signin = async (user_email: FormDataEntryValue, user_password: FormDataEntryValue) => {
    try {
        const result = await instance.post("auth/signin", {
            user_email,
            user_password
        })

        return result.data
    } catch (err: any) {
        return {
            success: false,
            ...err.response.data
        }
    }
}

export const signup = async (user_name: FormDataEntryValue, user_nickname: FormDataEntryValue, user_email: FormDataEntryValue, user_password: FormDataEntryValue) => {
    try {
        const result = await instance.post("user/signup", {
            user_name,
            user_nickname,
            user_email,
            user_password
        })

        return result.data;
    } catch (err: any) {
        return {
            success: false,
            err: err
        }
    }
}