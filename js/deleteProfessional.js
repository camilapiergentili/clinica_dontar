function findProfessionalById() {
    const dniInput = document.getElementById("dni");

    dniInput.addEventListener("change", async (event) => {
        event.preventDefault();
        
        const nombreInput = document.getElementById("nombre");
        const apellidoInput = document.getElementById("apellido");
        const matriculaInput = document.getElementById("matricula");
        const especialidadesInput = document.getElementById("especialidades");
        const emailInput = document.getElementById("email");
        
        const dni = dniInput.value;

        try{
            
            const response = await api.get(`administrator-professional/find-by-dni/${dni}`);
            const data = response.data;
            localStorage.setItem("idProfesional", data.id);
            nombreInput.value = data.firstName;
            apellidoInput.value = data.lastName;
            matriculaInput.value = data.matricula;

            if(Array.isArray(data.specialities) && data.specialities.length > 0){
                especialidadesInput.value = data.specialities.map(e => e.name).join(", "); 
            }else{
                especialidadesInput.value = 'Sin especialidad';
            }

            emailInput.value = data.username;

        }
        catch(err){
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }

    });
}

function deleteProfesional() {
    const botonEliminar = document.getElementById("eliminarProfesional");
    botonEliminar.addEventListener("click", async (event) => {
        event.preventDefault();

        const id = localStorage.getItem("idProfesional");

        try{
            await api.delete(`administrator-professional/delete-professional/${id}`);
            alert("Profesional eliminado con exito");
            limpiarCampos();
        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }

    });
}

function limpiarCampos() {
    document.getElementById("dni").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("email").value = "";
    document.getElementById("especialidades").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    findProfessionalById();
    deleteProfesional();
});