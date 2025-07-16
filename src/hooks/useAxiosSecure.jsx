import axios from "axios";

const axiosSecure = axios.create({
    // baseURL: `http://localhost:3000`
    baseURL: `https://book-a-play-server.vercel.app`
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;