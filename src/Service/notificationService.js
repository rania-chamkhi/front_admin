import http from "./axiosContext";

const createNot=(data) => { 
    return http.post("/notification",data )
}
const getAll=() => { 
    return http.get("/notification") 
}
const updatenot=(id , data ) => { 
    return http.put(`/notification/${id}`, data ) 
}
const getNotification=(id ) => { 
    return http.get(`/notification/${id}`) 
}

const deleteNot=(id ) => { 
    return http.delete(`/notification/${id}`) 
}

export default { 
    createNot , getAll ,updatenot ,getNotification ,deleteNot
}