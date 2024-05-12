import axiosClient from "./axiosClient";

const userApi = {
  getAll(params) {
    const url = "getListRoom/1";
    return axiosClient.get(url, { params: params });
  },
  getAvailRoom(params) {
    const url = "getAvailRoom/1";
    return axiosClient.get(url, { params: params });
  },
  getType(params) {
    const url = "getAllRoomType";
    return axiosClient.get(url, { params: params });
  },

  //   get(id) {
  //     const url = `/users/${id}`;
  //     return axiosClient.get(url);
  //   },

    add(data) {
      const url = "/users";
      return axiosClient.post(url, data);
    },
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
