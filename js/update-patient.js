async function myProfile() {
    
    try{
        const response = await api.get("patient/my-profile");
        const data = response.data;

        document.getElementById("dni").value = data.dni;
        document.getElementById("first-name").value = data.firstName;
        document.getElementById("last-name").value = data.lastName;
        document.getElementById("email").value = data.username;
        document.getElementById("date-of-birth").value = data.dateOfBirth;
        document.getElementById("obra-social").value = data.obraSocial;
        document.getElementById("phone").value = data.phone;

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    };

}

function updatePatient() {
    const form = document.getElementById("div__personal_data");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedPatient = {

            dni: document.getElementById("dni").value,
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            username: document.getElementById("email").value,
            dateOfBirth: document.getElementById("date-of-birth").value,
            obraSocial: document.getElementById("obra-social").value,
            phone: document.getElementById("phone").value,

        };

        try{
            await api.put("patient/update", updatedPatient);
            alert("Cambios guardados");
        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        };

    });
};

document.addEventListener("DOMContentLoaded", () => {
    myProfile(),
    updatePatient()
})