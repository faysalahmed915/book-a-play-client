import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: `http://localhost:3000`
    baseURL: `https://book-a-play-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;




// // hooks/useAxios.js
// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // adjust
//   withCredentials: true,
// });

// export default function useAxios() {
//   return instance;
// }
