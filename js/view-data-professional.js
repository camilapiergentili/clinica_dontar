document.addEventListener("DOMContentLoaded", async () => {

    try{
        const response = await api.get("/professionals/my-profile");
        const data = response.data;

        document.getElementById("first_name").value = data.firstName;
        document.getElementById("last_name").value = data.lastName;
        document.getElementById("dni").value = data.dni;
        document.getElementById("email").value = data.username;
        document.getElementById("speciality").value = data.specialities.map(s => s.name).join(", ");
        document.getElementById("matricula").value = data.matricula;
        
    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }

})