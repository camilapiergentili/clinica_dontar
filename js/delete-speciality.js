function findSpeciality(){

    api.get('administrator-speciality/get-all')
    .then(response => {
        const specialities = response.data;

        const specialitiesBody = document.getElementById('especialidades-body');

        specialities.forEach(speciality => {
            const item = document.createElement('tr');
            item.innerHTML = `
            <td>
                <div class="speciality-row">
                    <span>${speciality.name}</span>
                    <button class="btn-delete" data-id="${speciality.idSpeciality}" title="Eliminar Especialidad">
                        <i class="fas fa-trash"></i>
                    </button>
                 </div>
            </td>
            `;
            specialitiesBody.appendChild(item);
        });
    })
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401){
                alert("Token invalido o caducado");
            } else {
                alert("Error: " + JSON.stringify(err.response.data));
            }
        }else {
            alert("Error inesperado");
        }
    });

}

function deleteSpeciality() {
    document.getElementById("especialidades-body").addEventListener("click", (event) => {
        event.preventDefault();

        const icon = event.target.closest('.btn-delete');

        if(icon) {
            const id = icon.getAttribute('data-id');
            if(confirm("Esta seguro que quiere eliminar la especialidad?")){
                api.delete(`administrator-speciality/delete/${id}`)
                .then(response => {
                    const row = icon.closest('tr');
                    if(row) row.remove();
                })
                .catch(err => {

                    alert(JSON.stringify(err.response.data));

                });
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    findSpeciality(),
    deleteSpeciality()
})

