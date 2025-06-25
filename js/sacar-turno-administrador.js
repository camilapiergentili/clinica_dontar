function getPatientById() {
    const dniPatient = document.getElementById("dni");

    dniPatient.addEventListener("change", async (event) => {
        event.preventDefault();

        const dni = dniPatient.value;
    
        try{
            const response = await api.get(`patients/${dni}`);
            const data = response.data;

            document.getElementById("nombre").value = data.firstName;
            document.getElementById("apellido").value = data.lastName;

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }

    })
}

async function getSpeciality() {

    try{
        const response = await api.get("specialities/");
        const data = response.data;

        const selectSpecialities = document.getElementById("especialidad");
        selectSpecialities.innerHTML = '<option value="">Selecciona una especialidad</option>';

        data.forEach(speciality => {
            const item = document.createElement("option");
            item.value = speciality.idSpeciality;
            item.textContent = speciality.name;
            selectSpecialities.appendChild(item);
        });

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }

}

function getProfessionalForSpeciality() {
    document.getElementById("especialidad").addEventListener("change", async function() {
        const IdSpeciality = this.value;

        const selectProfessional = document.getElementById("profesional");
        selectProfessional.innerHTML = '<option value="">Selecciona una profesional</option>';
        selectProfessional.disabled = true;

        try{
            const response = await api.get(`professionals/speciality/${IdSpeciality}`);
            const data = response.data;

            data.forEach(profesional => {
                const item = document.createElement("option");
                item.value = profesional.id;
                item.textContent = `${profesional.firstName} ${profesional.lastName}`;
                selectProfessional.appendChild(item);

            })

            if(data.length > 0){
                selectProfessional.disabled = false;
            }

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }


    });
}

document.addEventListener("DOMContentLoaded", () => {
    getPatientById(),
    getSpeciality(),
    getProfessionalForSpeciality()
})