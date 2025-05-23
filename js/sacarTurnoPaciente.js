
function cargarEspecialidades() {

    api.get('administrator-speciality/get-all')
        .then(response => {
            const specialities = response.data;

            const selectSpecialities = document.getElementById("especialidad");

            selectSpecialities.innerHTML = '<option value="">Selecciona una especialidad</option>';

            specialities.forEach(speciality => {
                const option = document.createElement("option");
                option.value = speciality.idSpeciality;
                option.textContent = speciality.name;
                selectSpecialities.appendChild(option);

            });
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 401) {
                    // Token inválido, redirigir al login o mostrar mensaje
                    alert("Token inválido o caducado. Por favor, inicie sesión nuevamente.");
                    window.location.href = "/clinica_dontar/html/login.html"; 
                } else {
                    console.error("Detalles del error:", err.response.data);
                    alert("Error: " + JSON.stringify(err.response.data));
                }
            } else {
                console.error("Error desconocido:", err);
                alert("Error inesperado");
            }
        });
}

function mostrarProfesionalPorId() {

    document.getElementById("especialidad").addEventListener("change", function () {
        const specialityId = this.value;

        const selectProfessional = document.getElementById("profesional");
        selectProfessional.innerHTML = '<option value="">Selecciona un profesional</option>';
        selectProfessional.disabled = true;

        if (!specialityId) return;

        api.get(`/professional/speciality/${specialityId}`)
            .then(res => {
                const professionals = res.data;
                professionals.forEach(professional => {
                    const option = document.createElement("option");
                    option.textContent = `${professional.firstName} ${professional.lastName}`;
                    selectProfessional.appendChild(option);

                });

                if (professionals.length > 0) {
                    selectProfessional.disabled = false;
                }
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            })

    })

}

document.addEventListener("DOMContentLoaded", () => {
    cargarEspecialidades();
    mostrarProfesionalPorId();
});


