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

  addRoom(data) {
    const url = "/Room/add";
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
  getBooking(params) {
    const url = "getallBooking";
    return axiosClient.get(url, { params: params });
  },

  getPayments(params) {
    const url = "getallPayments";
    return axiosClient.get(url, { params: params });
  },

  // giờ tôi muốn "getRevenue/Payments/ + với biến nhập thêm vào (2023, 2024, ..)"
  // thì làm như nào nhỉ
  getRevenue(params) {
    const url = "getRevenue/Payments/" + params;
    console.log(url);
    return axiosClient.get(url, params);
  },

  getLogin({username, password}){
    const url = "login";
    return axiosClient.post(url,{
      "user_name": username,
      "user_password": password
    })
  },

  getSignUp({username, password, email, fullname, value}){
    const url = "register";
    return axiosClient.post(url,{
      "user_name": username,
      "user_password": password,
      "full_name": fullname,
      "email": email,
      "phone": value
    })
  },
  getValidCode({verificationCode}) {
    const url = "register/validation";
    return axiosClient.post(url,{
      "userInput": verificationCode
    })
  },

  getLogout({sessionId, userName, role}){
    const url = "logoutt";
    return axiosClient.post(url,{
      "sessionId": sessionId,
      "username": userName,
      "role": role
    })
  },

  getHome({sessionId, userName, role}){
    const url = "home";
    return axiosClient.post(url,{
      "sessionId": sessionId,
      "username": userName,
      "role": role
    })
  }
};

export default userApi;
