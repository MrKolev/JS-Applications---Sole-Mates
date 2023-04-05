import { api } from "./api.js";

const endpoint = {
    "login": `/users/login`,
    "register": `/users/register`,
    "logout": `/users/logout`,
    "getAll": `/data/shoes?sortBy=_createdOn%20desc`,
    "createNew": `/data/shoes`,
    "getById": (id) => `/data/shoes/${id}`,
    "search" : (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
}

export const edit = (id,data) => api.put(endpoint.getById(id), data);

export const search = (query) => api.get(endpoint.search(query));

export const createAlbum = (data) => api.post(endpoint.createNew, data);

export const deleteOne = (id) => api.del(endpoint.getById(id));

export const getInfo = (id) => api.get(endpoint.getById(id));

export const getAll=()=> api.get(endpoint.getAll);

export const logout = ()=>api.get(endpoint.logout);

export const login = (email, password) => api.post(endpoint.login, { email, password });

export const register = (email, password) => api.post(endpoint.register, { email, password });
