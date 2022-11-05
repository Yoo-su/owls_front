import axios from "plugin/axios";
import { AxiosError } from "axios"
export const signin = async (user_email: FormDataEntryValue, user_password: FormDataEntryValue) => {
    try {
        const result = await axios.post("auth/signin", {
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