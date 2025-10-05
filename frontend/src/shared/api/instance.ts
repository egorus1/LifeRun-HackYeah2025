import axios from "axios";

const BASE_URL = "https://carless-margarete-counterattractive.ngrok-free.dev/";

function createInstance() {
    const instance = axios.create({
        baseURL: BASE_URL,
    });
    return instance;
}

export const baseInstance = createInstance();