import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
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
