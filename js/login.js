document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener los valores de los campos de formulario
    const username = document.querySelector(".input__email").value;
    const password = document.querySelector(".input__password").value;

    // Validación básica
    if (!username || !password) {
        alert("Por favor, completa ambos campos.");
        return;
    }

    const data = {
        username: username,
        password: password
    }
    
    axios({
        method: 'post',
        url: 'http://localhost:8081/auth/login',
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },

        withCredentials: true
    })
        .then(res => {

            const token = res.data.token;
            const role = res.data.role;

            // Guardamos el token en localStorage
            localStorage.setItem("token", token);

            // Redirigimos según el rol
            if (role === "PACIENTE") {
                window.location.href = "/clinica_dontar/html/profile_patient.html"; // Redirigir al perfil del paciente
            } else if (role === "PROFESIONAL") {
                window.location.href = "/clinica_dontar/html/profile_professional.html"; // Redirigir al perfil profesional
            } else if (role === "ADMINISTRADOR") {
                window.location.href = "/clinica_dontar/html/profile_administrator.html";  // Redirigir al perfil del administrador
            } else {
                alert("Rol no reconocido. Por favor, contacta al soporte.");
            }
        })
        .catch(error => {
            alert("Hubo un error al iniciar sesión. Inténtalo de nuevo.");
        });
});


