// utils/storage.js

export const saveUserData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getUserData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const clearUserData = (key) => {
    localStorage.removeItem(key);
};
