import axios from "axios";
import { Cat, UpdateCat } from "./types/cat.interface";

const PORT = import.meta.env.VITE_PORT ?? window.location.port
const API_LOCATION = `${window.location.protocol}//${window.location.hostname}:${PORT}/api`;

export function catsGet():Promise<Cat[]> {
    return axios.get<Cat[]>(`${API_LOCATION}/cats`).then(x => x.data);
}

export function catsDelete(id:number)  {
    return axios.delete<Cat>(`${API_LOCATION}/cats/${id}`).then(x => x.data);
}

export function catsUpdate({id,cat}:{id:number,cat:UpdateCat})  {
    return axios.put<Cat>(`${API_LOCATION}/cats/${id}`,cat).then(x => x.data);
}

export function catsCreate(cat:UpdateCat)  {
    return axios.post<Cat>(`${API_LOCATION}/cats/`,cat).then(x => x.data);
}