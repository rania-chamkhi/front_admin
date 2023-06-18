import http from "./axiosContext"

const create=(data)=>{
    return http.post("/user",data)
}
const getAll=()=>{
    return http.get("/user")
}
const update=(id,data)=>{
    return http.put(`/user/${id}`,data)
}
const getById=(id)=>{
    return http.get(`/user/${id}`)
}

const GetUserByusername=(username)=>{
    return http.get(`/user/username?username=${username}}`)
}

const GetUserByemail=(email)=>{
    return http.get(`/user/email?email=${email}}`)
}

const Deleteone=(id)=>{
    return http.delete(`/user/${id}`)
}
 export default {
    create,getAll,update,getById,Deleteone,GetUserByusername,GetUserByemail
 }
