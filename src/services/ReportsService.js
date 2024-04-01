import axios from "@/plugins/axios"

class ReportsService {

  async findById(id) {

    return await axios.get(`/report/${id}`, { responseType: 'blob' });
  }

  async findAll() {

    const axiosResponse = await axios.get("/report")
    return axiosResponse.data;
  }

}

export default new ReportsService()