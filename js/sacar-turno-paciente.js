
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
                    alert(JSON.stringify(err.response.data));
                    window.location.href = "/clinica_dontar/html/login.html"; 
                } else {
                    alert(JSON.stringify(err.response.data));
                }
            } else {
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
                    option.value = professional.id;
                    option.textContent = `${professional.firstName} ${professional.lastName}`;
                    selectProfessional.appendChild(option);

                });

                if (professionals.length > 0) {
                    selectProfessional.disabled = false;
                }
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    });

}

function selectDayAppointment() {
    document.getElementById("profesional").addEventListener("change", function () {

        const idProfesional = this.value;
        const selectDate = document.getElementById("fecha");
        selectDate.innerHTML = '<option value="">Seleccione una fecha</option>';
        selectDate.disabled = true;

        if(!idProfesional) return;

        api.get(`appointment/date/${idProfesional}`)
        .then(response => {
            const fechas = response.data;
            fechas.forEach(fecha => {
                const option = document.createElement("option");
                option.value = fecha;
                option.textContent = fecha; 
                selectDate.appendChild(option);
            });

            if(fechas.length > 0){
                selectDate.disabled = false;
            }

        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
        });
    });

}

function selectTimeAppointment() {
    document.getElementById("fecha").addEventListener("change", function() {
        const fecha = this.value;
        const idProfesional = document.getElementById("profesional").value;
        const selectTime = document.getElementById("hora");
        selectTime.innerHTML = '<option value="">Seleccione un horario</option>';
        selectTime.disabled = true;

        if(!idProfesional || !fecha) return;

        api.get(`appointment/available/${idProfesional}?date=${fecha}`)
        .then(res => {
            const horarios = res.data;
            horarios.forEach(time => {
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                selectTime.appendChild(option);
            });

            if(horarios.length > 0){
                selectTime.disabled = false;
            }
        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
        });

    });
}

function bookAppointment() {
    document.getElementById("confirmarTurno").addEventListener("click", (event) => {
        event.preventDefault();

        const idSpeciality = document.getElementById("especialidad").value;
        const idProfesional = document.getElementById("profesional").value;
        const day = document.getElementById("fecha").value;
        const time = document.getElementById("hora").value;
        const isFirstVisit = document.getElementById("primeraConsulta").checked;

        const appointment = {
            appointmentDay: day,
            appointmentTime: time,
            idProfessional: idProfesional,
            idSpeciality: idSpeciality,
            firstAppointment: isFirstVisit
        };

        api.post(`appointment/reservation`, appointment)
        .then(res => {
            alert("El turno se ha registrado correctamente");
            limpiarCampos()
        })
        .catch(err => {
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        });

    })

}

function limpiarCampos(){
    
    document.getElementById("especialidad").value = '';
    document.getElementById("profesional").value = '';
    document.getElementById("fecha").value = '';
    document.getElementById("hora").value = '';
    document.getElementById("primeraConsulta").checked = '';

}

document.addEventListener("DOMContentLoaded", () => {
    cargarEspecialidades();
    mostrarProfesionalPorId();
    selectDayAppointment();
    selectTimeAppointment();
    bookAppointment()

});


