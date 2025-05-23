function findPatientByDni() {
    const button_dni = document.getElementById("dni");

    button_dni.addEventListener("change", async (event) => {
        event.defaultPrevented();

        const dni = button_dni.value;

        const firstnameInput = document.getElementById("first_name");
        const lastnameInput = document.getElementById("last_name");
        const usernameInput = document.getElementById("email");
        const dateOfBirthInput = document.getElementById("date_of_birth");
        const obraSocialInput = document.getElementById("obra_social");
        const phoneInput = document.getElementById("phone");

        try{
            
            const response = await api.get(`patient/find-by-dni/${dni}`);
            const data = response.data;

            
            firstnameInput.value = data.firstName;
            lastnameInput.value = data.lastName;
            usernameInput.value = data.username;
            dateOfBirthInput.value = data.dateOfBirth;
            obraSocialInput.value = data.obraSocial;
            phoneInput.value = data.phone;

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }

    });
}

/*terminar*/
function deletePatient() {
    document.getElementById("eliminarPatient").addEventListener("click", (event) => {
        event.preventDefault();

        api.delete()
    })
}