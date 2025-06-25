document.addEventListener('DOMContentLoaded', async () => {

    await api.get('specialities/')
    .then(response => {

        const specialities = response.data;

        const specialitiesBody = document.getElementById('especialidades-body');

        specialities.forEach(speciality => {
            const item = document.createElement('tr');
              item.innerHTML = `
                <td>${speciality.name}</td>
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
    
});