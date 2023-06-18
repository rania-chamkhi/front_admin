import http from "./axiosContext";

const getMessages = () => {
  return http.get("/contact");
};
const getMessageById = (id) => {
  return http.get(`/contact/${id}`);
};
const DeleteMessageById = (id) => {
  return http.delete(`/contact/${id}`);
};
const sendEmail = async (data) => {
  try {
    const response = await http.post("contact/reply", data);

    console.log(response.data); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
  }
};
const getFeedBackByCar = (id) => {
  return http.get(`/contact/feedback/${id}`);
};

export default {
  getFeedBackByCar,
  getMessages,
  getMessageById,
  sendEmail,
  DeleteMessageById,
};
