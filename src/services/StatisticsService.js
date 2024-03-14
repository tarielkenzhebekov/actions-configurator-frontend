import axios from "@/plugins/axios"

class StatisticsService {

  async findById(id, type) {
    const params = {
      id: id,
      type: type
    }

    return await axios.get(`/statistics/action`, { params });
  }

  async findAll() {
    const all = await axios.get("/statistics/overall");
    return all.data;
  }

}

export default new StatisticsService()