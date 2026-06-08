import api from "../utils/axiosIntance"
export const createNote=(data)=>{
    return api.post("/notes/create",data)
}
export const getNote=(id)=>{
return api.get(`/notes/get/${id}`)
}
export const updateNote=(id,data)=>{
    return api.put(`/notes/update/${id}`,data)
}
export const deleteNote=(id)=>{
    return api.delete(`/notes/delete/${id}`);
}