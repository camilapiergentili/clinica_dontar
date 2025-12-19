async function myProfile() {

    try{

        const response = await api.get("/professionals/my-profile");
        const data = response.data;

        document.getElementById("first_name").value = data.firstName;
        document.getElementById("last_name").value = data.lastName;
        document.getElementById("email").value = data.username;
        document.getElementById("dni").value = data.dni;
        document.getElementById("matricula").value = data.matricula;
        

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }

}

function update() {
    const form = document.getElementById("div__personal_data");

    form.addEventListener("submit", async (event) => {
        
        event.preventDefault();

        const datosModificados = {
            firstName: document.getElementById("first_name").value,
            lastName: document.getElementById("last_name").value,
            username: document.getElementById("email").value,
            dni: document.getElementById("dni").value,
            matricula: document.getElementById("matricula").value,
        }

        try{
            await api.put("professionals/update", datosModificados);
            alert("Datos modificados con exito");
        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    myProfile(),
    update()
})