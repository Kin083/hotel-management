import axiosClient from "./axiosClient";


// const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

const userApi = {
//   getAll(params) {
//     const url = "getallGuest";
//     return axiosClient.get(url, { params: params });
//     },
    getAll(params) {
        const url = "getListRoom/1";
        return axiosClient.get(url,{params : params})
    },
    getType(params) {
      const url = "/getRoomByRNumberAndAvailable";
      return axiosClient.get(url, { params: params });
    }

  //   get(id) {
  //     const url = `/users/${id}`;
  //     return axiosClient.get(url);
  //   },

  //   add(data) {
  //     const url = "/users";
  //     return axiosClient.post(url, data);
  //   },
  //   update(data) {
  //     const url = `/users/${data.id}`;
  //     return axiosClient.patch(url, data);
  //   },
  //   remove(id) {
  //     const url = `/users/${id}`;
  //     return axiosClient.delete(url);
  //   },
};

export default userApi;

