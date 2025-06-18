
function cargarSpecialities() {

    api.get('administrator-speciality/get-all')
    .then(response => {
        const specialities = response.data;

        const specialityForm = document.getElementById("select_speciality");

        specialityForm.innerHTML = '<option value="">Selecciona una especialidad</option>'

        specialities.forEach(speciality => {
            const item = document.createElement("option");
            item.value = speciality.idSpeciality;
            item.textContent = speciality.name;
            specialityForm.appendChild(item);
        });
    })
    .catch(err => {
        alert("Error " + JSON.stringify(err.response.data));
    });
}



function formularioProfessional() {
    
    const form = document.getElementById("form_professional");

    form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Obtengo los datos del formulario con el objeto FormData
    const formData = new FormData(form);

    //Convierto el FormData en un Objeto 
    const data = Object.fromEntries(formData.entries());

    const specialitySelect = document.getElementById('select_speciality');
    const specialityId = Number(specialitySelect.value);

    if(!specialityId){
        alert("Debe seleccionarse una especialidad");
    }

    data.idSpecialityDtoList = [specialityId];

    if(data.password != data.confirmPassword){
        alert("Las contraseñas no coinciden");
        return;
    }
    
    try{
        const response = await api.post('administrator-professional/register-professional', data);
        const idProfesional = response.data.id;

        localStorage.setItem("idProfessional", idProfesional);

        alert('Profesional registrado correctamente');
        window.location.href = 'schedule.html';
    }
    catch (err) {
        alert("Error " + JSON.stringify(err.response.data));
    };

});

}

document.addEventListener("DOMContentLoaded", () => {
    formularioProfessional();
    cargarSpecialities();
});

