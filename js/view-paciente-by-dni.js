document.addEventListener("DOMContentLoaded", () => {


    const button = document.getElementById("button-patient");

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const dni = document.getElementById("dni").value;
        const firstnameInput = document.getElementById("first_name");
        const lastnameInput = document.getElementById("last_name");
        const usernameInput = document.getElementById("email");
        const dateOfBirthInput = document.getElementById("date_of_birth");
        const obraSocialInput = document.getElementById("obra_social");
        const phoneInput = document.getElementById("phone");

        try {
            const response = await api.get(`patients/${dni}`);
            const data = response.data;

            firstnameInput.value = data.firstName;
            lastnameInput.value = data.lastName;
            usernameInput.value = data.username;
            dateOfBirthInput.value = data.dateOfBirth;
            obraSocialInput.value = data.obraSocial;
            phoneInput.value = data.phone;

            
        }
        catch (err) {
            alert(JSON.stringify(err.response.data));
            limpiarCampos();
        }
    });
})

function limpiarCampos() {
    document.getElementById("dni").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date_of_birth").value = "";
    document.getElementById("obra_social").value = "";
    document.getElementById("phone").value = "";

}