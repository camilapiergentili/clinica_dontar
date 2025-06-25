async function findPatient() {
    try{
        
        const patientDni = document.getElementById("dni").value;
        
        if (!patientDni) {
            alert("Por favor, ingrese el DNI del paciente.");
            return;
        }

        const response = await api.get(`patients/${patientDni}`);
        const data = response.data;
        localStorage.setItem("idPatient", data.id)
        
        document.getElementById("nombre").value = data.firstName;
        document.getElementById("apellido").value = data.lastName;  
        document.getElementById("obraSocial").value = data.obraSocial;

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("obraSocial").value = '';
    }

}

async function selectProfessional() {
    try{
        const response = await api.get("professionals/");
        const data = response.data;

        const professionals = document.getElementById("profesional");
        professionals.innerHTML = '<option value="">Selecciona un profesional</option>';
        
        data.forEach(prof => {
            const item = document.createElement("option");
            item.value = prof.id;
            item.textContent = `${prof.firstName} ${prof.lastName}`;
            
            professionals.appendChild(item);

        });

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }
}

function addHistory() {
    const form = document.getElementById("historial-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const patientId = localStorage.getItem("idPatient");
        const professionalId = document.getElementById("profesional").value;

        historyData = {
            idPatient: patientId,
            idProfessional: professionalId,
            date: document.getElementById("fecha").value,
            history: document.getElementById("historial").value
        }

        try{
            await api.post("/medicalRecord/", historyData);
            alert("La historia clinica se registro correctamente");
        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }

    })
}

document.addEventListener("DOMContentLoaded", () => {
    selectProfessional();
    addHistory();

    const dniInput = document.getElementById("dni");

    dniInput.addEventListener("blur", findPatient);
})