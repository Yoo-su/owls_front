import axios from "axios";

export const instance = axios.create({
})
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)


export const accessInstance = axios.create({
    timeout: 10000,
})

accessInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error);
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = "/signin"
            alert("토큰이 만료되었습니다 다시 로그인해주세요")
        }
        return Promise.reject(error);
    }
)