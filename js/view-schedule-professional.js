async function loadProfessionals() {
    await api.get("professionals/")
    .then(response => {
        const professionals = response.data;
    
        const selectProfessionals = document.getElementById("profesional");

        professionals.forEach(professional => {
            const item = document.createElement("option");
            item.value = professional.id;
            item.textContent = `${professional.firstName} ${professional.lastName}`;

            selectProfessionals.appendChild(item);
            document.querySelector(".div__tabla").style.display = "block";

        });

    })
    .catch(err => {
        alert(JSON.stringify(err.response.data));
    });
}

function schedule() {
    
    const buttonAdd = document.getElementById("button-add-schedule");
    const buttonDelete = document.getElementById("button-delete-schedule");
    const warning = document.getElementById("warning");

    const role = localStorage.getItem("role");

    
    document.getElementById("profesional").addEventListener("change", async (event) => {
        event.preventDefault();

        const idProfesional = event.target.value;

        if(!idProfesional) return;

        try{
            const response = await api.get(`professionals/getSchedule/${idProfesional}`);
            const schedule = response.data;
            
            document.getElementById("horarios-body").innerHTML = '';

            if(schedule.length === 0 || !schedule) {
                mostrarAdvertencia("El profesional no tiene agenda");

                if(role === "ADMINISTRADOR"){
                    buttonAdd.style.display = "block";
                    buttonDelete.style.display = "none";

                }
                
                return;
            }

            warning.style.display = "none";

            mostrarAgenda(schedule);

            if(role === "ADMINISTRADOR"){
                buttonDelete.style.display = "block";
                buttonAdd.style.display = "block";
            }
        }
        catch (err) {
            if (err.response && err.response.data) {
                alert(JSON.stringify(err.response.data));
            } else {
                alert("Ocurrió un error inesperado al consultar la agenda.");
            }
        }
    });
}

function mostrarAdvertencia(message){
    const advertencia = document.getElementById("warning");
    advertencia.textContent = message;
    advertencia.style.display = "block";
}


function mostrarAgenda(schedule) {
    
    const diasSemanaMap = {
        MONDAY: "Lunes",
        TUESDAY: "Martes",
        WEDNESDAY: "Miércoles",
        THURSDAY: "Jueves",
        FRIDAY: "Viernes",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo"
    };

    const agenda = [];

    schedule.forEach(s => {
        agenda.push({
            id: s.idSchedule,
            day: s.day,
            startTime: s.startTime,
            endTime: s.endTime
        });
    });

    const tbody = document.getElementById("horarios-body");
    tbody.innerHTML = '';

    agenda.forEach(a => {
       const row = document.createElement("tr");

       row.dataset.id = a.id;

       row.addEventListener("click", () => {
        
        tbody.querySelectorAll("tr").forEach(r => r.classList.remove("selected"));
        row.classList.add("selected");
       });

       const tDia = document.createElement("td");
       tDia.textContent = diasSemanaMap[a.day];

       const tHorario = document.createElement("td");
       tHorario.textContent = `${a.startTime} - ${a.endTime}`;

       row.appendChild(tDia);
       row.appendChild(tHorario);
       tbody.appendChild(row);
    });

}

function deleteSchedule() {

    const div__button = document.getElementById("button-delete-schedule");

    div__button.addEventListener("click", async (event) => {
        event.preventDefault();

        const selectRow = document.querySelector("tr.selected");

        if(!selectRow) return;

        const idSchedule = selectRow.dataset.id;
        const idProfesional = document.getElementById("profesional").value;

        try{
            await api.delete(`schedule/delete/${idProfesional}/${idSchedule}`);

            selectRow.remove();

            alert("Agenda eliminada con exito");

        }
        catch(err) {
            alert(JSON.stringify(err.response.data));
        }

    });

}

function addSchedule() {
    const buttonAdd = document.getElementById("button-add-schedule");
    buttonAdd.addEventListener("click", (event) =>  {
        event.preventDefault();

        const idProfesional = document.getElementById("profesional").value;
        localStorage.setItem("idProfessional", idProfesional);

        window.location.href = 'schedule.html';

    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProfessionals(),
    schedule(),
    deleteSchedule(),
    addSchedule()
});