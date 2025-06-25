document.addEventListener("DOMContentLoaded", async () => {

    try{
        const response = await api.get("patients/my-profile");
        const data = response.data;

        const birthDate = new Date(data.dateOfBirth);

        document.getElementById("first_name").value = data.firstName;
        document.getElementById("last_name").value = data.lastName;
        document.getElementById("dni").value = data.dni;
        document.getElementById("email").value = data.username;
        document.getElementById("day").value = (birthDate.getDate() + 1).toString().padStart(2, "0");
        document.getElementById("month").value = (birthDate.getMonth() + 1).toString().padStart(2, "0");
        document.getElementById("year").value = birthDate.getFullYear();
        document.getElementById("obra_social").value = data.obraSocial;
        document.getElementById("telephone").value = data.phone;

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    };

});