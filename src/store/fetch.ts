// eslint-disable-next-line
const API_URL = process.env.VUE_APP_API_URL;

// eslint-disable-next-line
export function fetchApi(url: string, config?: object) {
  return fetch(`${API_URL}${url}`, config);
}
