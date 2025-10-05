import axios from "axios";

const BASE_URL = import.meta.env.VITE_PUBLIC_URL;

function createInstance() {
    const instance = axios.create({
        baseURL: BASE_URL,
    });
    return instance;
}

export const baseInstance = createInstance();