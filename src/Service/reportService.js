import http from "./axiosContext";

const getReport = (data) => {
  return http.get("/admin/report");
};

export default {
  getReport,
};
