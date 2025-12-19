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
        url: 'http://turnosmedicos.railway.internal/auth/login ',
        data: data,
    })
        .then(res => {

            const token = res.data.token;
            const role = res.data.role;

            // Guardo el token en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // Se redirige según el rol
            if (role === "PACIENTE") {
                window.location.href = "/html/profile_patient.html"; // Redirigir al perfil del paciente
            } else if (role === "PROFESIONAL") {
                window.location.href = "/html/profile_professional.html"; // Redirigir al perfil profesional
            } else if (role === "ADMINISTRADOR") {
                window.location.href = "/html/profile_administrator.html";  // Redirigir al perfil del administrador
            } else {
                alert("Rol no reconocido. Por favor, contacta al soporte.");
            }
        })
        .catch(error => {
            alert(JSON.stringify(error.response.data));
        });
});


