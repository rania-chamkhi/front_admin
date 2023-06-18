/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-anonymous-default-export */

import http from './axiosContext';

const register=(data) => { 
    return http.post("/auth/signupadmin",data )
}

const LoginAuth=(data) => { 
    return http.post("/auth/signinadmin",data )
}

const LogoutAdmin=() => { 
    return http.get("/auth/logoutadmin")
}


const getAdmin=(id ) => { 
    return http.get(`/admin/${id}` ) 
}

const getAll=()=>{
    return http.get("/admin")
}

const updateAdmin=(id , data ) => { 
    return http.put(`/admin/${id}`, data ) 
}

const deleteAdmin=(id ) => { 
    return http.delete(`/admin/${id}`) 
}


export default { 
    register,LoginAuth  , getAdmin,updateAdmin,getAll,deleteAdmin,LogoutAdmin
}