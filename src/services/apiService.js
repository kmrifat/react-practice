import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hr.mediusware.xyz/api/'
})

instance.interceptors.response.use(
    (config) => {
        return config
    }
)

export default instance