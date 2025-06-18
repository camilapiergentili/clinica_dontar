function findPatientByDni() {

    const buttonSearch = document.getElementById("button-search");

    buttonSearch.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const dni = document.getElementById("dni").value;

        try{

            const response = await api.get(`patient/find-by-dni/${dni}`);
            const data = response.data;
            localStorage.setItem("idPatient", data.id);

            document.getElementById("nombre").value = data.firstName;
            document.getElementById("apellido").value = data.lastName;
            document.getElementById("fechaNacimiento").value = data.dateOfBirth;
            document.getElementById("obraSocial").value = data.obraSocial;
            document.getElementById("telefono").value = data.phone;
            document.getElementById("email").value = data.username;

            document.getElementById("div__personal_data").style.display = "block";
            document.getElementById("mensajeError").style.display = "none";
            document.getElementById("datosPaciente").style.display = "block";

        }
        catch(err) {
            
            document.getElementById("div__personal_data").style.display = "none";
            document.getElementById("mensajeError").style.display = "block";
            document.getElementById("datosPaciente").style.display = "none";
            alert(JSON.stringify(err.response.data));

        }

    });
}

function update() {
    const form = document.getElementById("datosPaciente");
    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const id = localStorage.getItem("idPatient");

        patientUpdate = {
            dni: document.getElementById("dni").value,
            firstName: document.getElementById("nombre").value,
            lastName: document.getElementById("apellido").value,
            username: document.getElementById("email").value,
            dateOfBirth: document.getElementById("fechaNacimiento").value,
            obraSocial: document.getElementById("obraSocial").value,
            phone: document.getElementById("telefono").value
        }

        try{
            await api.put(`patient/update?id=${id}`, patientUpdate);
            alert("Paciente modificado con éxito");

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    findPatientByDni(),
    update()
});