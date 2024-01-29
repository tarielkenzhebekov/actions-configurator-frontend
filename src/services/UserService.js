import http from "../http-common";

class UserService {
  getAll() {
    return http.get("/user");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  create(data) {
    return http.post("/auth/register", data);
  }

  update(id, data) {
    return http.put(`/user/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }
}

export default new UserService();
