import axios from "axios";

const privateAxios = axios.create({
  baseURL: "/",
});

privateAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      window.location.href = "/login";
    }
    return err;
  },
);

export { privateAxios };
