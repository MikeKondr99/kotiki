import axios from "axios";
import { Cat, UpdateCat } from "./types/cat.interface";

const PORT = import.meta.env.VITE_PORT ?? window.location.port
export const API_LOCATION = `${window.location.protocol}//${window.location.hostname}:${PORT}/api`;

export async function catsGet(): Promise<Cat[]> {
    return axios.get<Cat[]>(`${API_LOCATION}/cats`).then(x => x.data);
}

export async function catsDelete(id:number):Promise<Cat>  {
    return axios.delete<Cat>(`${API_LOCATION}/cats/${id}`).then(x => x.data);
}

export async function catsUpdate({id,cat}:{id:number,cat:UpdateCat}):Promise<Cat>  {
    return axios.put<Cat>(`${API_LOCATION}/cats/${id}`,cat).then(x => x.data);
}

export async function catsCreate(cat:UpdateCat):Promise<Cat>  {
    return axios.post<Cat>(`${API_LOCATION}/cats/`,cat).then(x => x.data);
}

export async function uploadImage(file:File): Promise<string> {
    return await fetch(`${API_LOCATION}/images/`,{
        method: 'POST',
        body: file,
    }).then(x => x.text());
}