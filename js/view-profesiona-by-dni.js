document.addEventListener("DOMContentLoaded",  () => {

    const button = document.getElementById("find-professional");
    button.addEventListener("click", async (event) => {

        event.preventDefault();

        const dni = document.getElementById("dni").value;
        const name = document.getElementById("first_name");
        const apellido = document.getElementById("last_name");
        const username = document.getElementById("email");
        const matricula = document.getElementById("matricula");
        const especialidad = document.getElementById("especialidad");
        
        try{
            const response = await api.get(`administrator-professional/${dni}`);
            const data = response.data;
            
            name.value = data.firstName;
            apellido.value = data.lastName;
            matricula.value = data.matricula;
            username.value = data.username;
            especialidad.value = data.specialities.map(s => s.name).join(", ");


        }
        catch(err){
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }
    });

})

function limpiarCampos() {
    document.getElementById("dni").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("email").value = "";
    document.getElementById("especialidad").value = "";
}