import http from "./axiosContext";

const createAg=(data) => { 
    return http.post("/agence",data )
}
const getAll=() => { 
    return http.get("/agence") 
}
const updateag=(id , data ) => { 
    return http.put(`/agence/${id}`, data ) 
}
const getAgence=(id ) => { 
    return http.get(`/agence/${id}`) 
}
const GetAgByname=(name)=>{
    return http.get(`/agence/name?name=${name}}`)
}
const deleteAg=(id ) => { 
    return http.delete(`/agence/${id}`) 
}

export default { 
    createAg , getAll ,updateag ,getAgence , GetAgByname,deleteAg
}