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

  addType(data) {
    const url = "/Roomtype/add";
    return axiosClient.post(url, data);
  },

  updateType(typeID,data) {
    const url = `/update/roomTYpe/${typeID}`;
    return axiosClient.post(url, data);
  },

   deleteType(typeID) {
    const url = `/Roomtype/delete/${typeID}`;
    return axiosClient.delete(url);
  },

  addRoom(data) {
    const url = "/Room/add";
    return axiosClient.post(url, data);
  },

  addBooking(data) {
    const url = "/BookingInfomation/add";
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
