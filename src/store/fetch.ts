const API_URL = import.meta.env.VITE_API_URL

export function fetchApi(url: string, config?: object) {
  return fetch(`${API_URL}${url}`, config)
}
