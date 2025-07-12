document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btn-find");

    btn.addEventListener("click", async (event) => {
        
        const dniPatient = document.getElementById("dni").value;

        try{
            const response = await api.get(`medicalRecord/${dniPatient}`);
            const data = response.data;
            document.getElementById("resultado").style.display = "block";

            const tBody = document.getElementById("historial-body");
            tBody.innerHTML = ""; 

            if(data.length === 0) {
                const patient = await api.get(`patient/${dniPatient}`);
                const fullName = patient.data.firstName + " " + patient.data.lastName;
                document.getElementById("nombrePaciente").textContent = fullName;
                mostrarAdvertencia("El paciente " + fullName +  " no cuenta con registros medicos");
                return;
            }

            document.getElementById("nombrePaciente").textContent = data[0].namePatient

            data.forEach(medical => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${medical.date}</td>
                                <td>${medical.history}</td>
                                <td>${medical.nameProfessional}</td>`
                tBody.appendChild(row);

            })
        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }
    })
})

function mostrarAdvertencia(message){
    const advertencia = document.getElementById("warning");
    advertencia.textContent = message;
    advertencia.style.display = "block";
}