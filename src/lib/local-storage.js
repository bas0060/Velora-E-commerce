
export const setLocalStorageItem = (key, value) => {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
};

export const getLocalStorageItem = (key) => {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : null;
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
