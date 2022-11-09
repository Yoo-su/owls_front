import axios from "axios";

export const instance = axios.create({

})


export const accessInstance = axios.create({
    withCredentials: true,
})