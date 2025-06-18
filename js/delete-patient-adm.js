function findPatientById() {
    const dniInput = document.getElementById("dni");

    dniInput.addEventListener("change", async (event) => {
        event.preventDefault();

        const dni = dniInput.value;

        try{
            const response = await api.get(`patient/find-by-dni/${dni}`);
            const data = response.data;

    
            localStorage.setItem("idPatient", data.id);

            document.getElementById("nombre").value = data.firstName;
            document.getElementById("apellido").value = data.lastName;
            document.getElementById("date_of_birth").value = data.dateOfBirth;
            document.getElementById("obra_social").value = data.obraSocial;
            document.getElementById("telefono").value = data.phone;
            document.getElementById("email").value = data.username;


        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }

    });
}

function deletePatient() {

    const delete_button = document.getElementById("eliminarPatient");
    delete_button.addEventListener("click", async (event) => {
        event.preventDefault();

        const id = localStorage.getItem("idPatient");

        console.log("el id es: ", id);
        
        if(!id){
            alert("Primero debe buscar un paciente por Dni.")
            return;
        }

        try{
            await api.delete(`patient/delete?id=${id}`);
            alert("Paciente eliminado con éxito");
            limpiarCampos();

        }
        catch(err){
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }

    });
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("obra_social").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("date_of_birth").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    findPatientById(),
    deletePatient()
});