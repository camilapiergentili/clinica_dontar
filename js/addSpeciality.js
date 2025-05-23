document.getElementById("div__register_speciality").addEventListener("submit", function (event) {
    event.preventDefault();

    const nameSpeciality = document.querySelector(".input__speciality").value;

    if(!nameSpeciality){
        alert("El campo no puede estar vacio");
    }

    data = {
        nameSpeciality: nameSpeciality
    }

    api.post('administrator-speciality/add-speciality', data)
    .then(res => {
        alert("Especialidad agregada con exito");
        document.querySelector(".input__speciality").value = '';

    })
    .catch(err => {
        alert("Hubo un error");
    });

})