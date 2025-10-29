

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://vps-5315501-x.dattaweb.com:8081',
=======
    baseURL: 'http://clinicadontar.com/',
>>>>>>> 65622dad3d23d28f000e919250cf6b9e1902773f
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
