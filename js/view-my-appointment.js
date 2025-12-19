async function getAppointment() {
    
    try{
        const response = await api.get("appointment/patient");
        const turnos = response.data;

        const turnosBody = document.getElementById("turnos-body");
        
        turnos.forEach(turno => {
            
            const row = document.createElement("tr");
            row.innerHTML =  `<td>${turno.dayAppointment}</td>
                              <td>${turno.timeAppointment}</td>
                              <td>${turno.speciality.name}</td>
                              <td>${turno.nameProfessional}</td>
                              <td>${turno.status}</td>
                              `;
                              
            if (turno.status === "RESERVADO") {
                
                const cellButton = document.createElement("td");
                cellButton.innerHTML = `<button class="btn-cancelar" data-id="${turno.idAppointment}">Cancelar</button>`;
                row.appendChild(cellButton);
            
            }

            turnosBody.appendChild(row);
        });

        if(turnos.length === 0 || !turnos){
            mostrarAdvertencia("No tienes turnos asignados");
        }

    }
    catch(err){
        alert(JSON.stringify(err.response.data));
    };

}

function mostrarAdvertencia(message){
    const advertencia = document.getElementById("warning");
    advertencia.textContent = message;
    advertencia.style.display = "block";
}

function cancelAppointment() {
    document.getElementById("turnos-body").addEventListener("click", async  (event) => {
        event.preventDefault();

        const button = event.target.classList.contains("btn-cancelar");

        if(button) {
            const idAppointment = event.target.getAttribute("data-id");

            if(confirm("Estas seguro de cancelar el turno?")){

                try{
                    
                    await api.delete(`appointment/cancel/${idAppointment}`);
                    alert("Turno cancelado con exito");

                }
                catch(err) {
                    alert(JSON.stringify(err.response.data));
                }

            }

        }
    });

}

document.addEventListener("DOMContentLoaded", () => {
    getAppointment(),
    cancelAppointment()

});


    
