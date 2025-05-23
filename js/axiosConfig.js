

const api = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,  // Esto asegura que se envíen las cookies de sesión si es necesario
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");  // Obtén el token de localStorage

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Agrega el token al encabezado Authorization
        }

        return config;  // No olvides devolver la configuración para que la solicitud continúe
    },
    (error) => {
        return Promise.reject(error);  // Maneja el error de la solicitud
    }
);

window.api = api;
