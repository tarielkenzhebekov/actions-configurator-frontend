import axios from "@/plugins/axios"

class ActionsService {

  create(action) {
    return axios.post("/action/create", action)
  }
  
  findById(id) {
    return axios.get(`/action/find/${id}`)
  }

  async findAll() {
    const all = await axios.get("/action/find/all")
    return all.data.result
  }

  updateById(id, action) {
    return axios.put(`/action/update/${id}`, action)
  }

  deleteById(id) {
    return axios.delete(`/action/delete/${id}`)
  }

}

export default new ActionsService()