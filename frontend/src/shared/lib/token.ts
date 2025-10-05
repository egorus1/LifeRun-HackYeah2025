import { v4 as uuidv4 } from 'uuid';

export const generateToken = (): string => {
    return uuidv4();
};

export const getToken = (): string => {
    let token = localStorage.getItem('userToken');
    if (!token) {
        token = generateToken();
        localStorage.setItem('userToken', token);
    }
    return token;
};

export const createToken = (): string => {
    const token = generateToken();
    localStorage.setItem('userToken', token);
    return token;
};

export const hasToken = (): boolean => {
    return localStorage.getItem('userToken') !== null;
};