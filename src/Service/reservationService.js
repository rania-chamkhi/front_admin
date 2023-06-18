import http from "./axiosContext";

const createReser = (data) => {
  return http.post("/reservation", data);
};
const getAll = () => {
  return http.get("/reservation");
};
const updaterservation = (id, data) => {
  return http.put(`/reservation/${id}`, data);
};
const getReservation = (id) => {
  return http.get(`/reservation/${id}`);
};
const getBynumPermis = (numPermis) => {
  return http.get(`/reservation/numPermis?numPermis=${numPermis}`);
};
const getAlldateReserv = () => {
  return http.get("/reservation/dateReserv");
};
const getAlldateFinLoc = () => {
  return http.get("/reservation/dateFinloc");
};
const deleteReserv = (id) => {
  return http.delete(`/reservation/${id}`);
};
const getReclamation = (id) => {
  return http.get(`/contact/reclamation/${id}`);
};
export default {
  createReser,
  getReclamation,
  getAll,
  updaterservation,
  getReservation,
  getBynumPermis,
  getAlldateReserv,
  getAlldateFinLoc,
  deleteReserv,
};
