import axios from "axios";

const axiosSecure = axios.create({
    baseURL: `https://zap-shift-server-psi.vercel.app`
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;