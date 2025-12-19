function getSchedule() {
  const agenda = [];

  const diasSemanaMap = {
    Lunes: "MONDAY",
    Martes: "TUESDAY",
    Miércoles: "WEDNESDAY",
    Jueves: "THURSDAY",
    Viernes: "FRIDAY",
  };

  const dataTable = document.getElementById("horariosTable");

  const filas = dataTable.getElementsByTagName("tr");

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const celda = fila.getElementsByTagName("td");
    const diaSemana = celda[0].textContent.trim();
    const day = diasSemanaMap[diaSemana];
    const inputInicio = celda[1].querySelector(".hora-inicio");
    const inputFin = celda[1].querySelector(".hora-fin");

    if (day && inputInicio?.value && inputFin?.value) {
      agenda.push({
        day: day,
        startTime: inputInicio.value,
        endTime: inputFin.value,
      });
    }
  }

  return agenda;
}

function clearAllInputs() {
  const startTime = document.querySelectorAll(".hora-inicio");
  const endTime = document.querySelectorAll(".hora-fin");

  startTime.forEach((input) => input.value = '');
  endTime.forEach((input) => input.value = '');
}

function scheduleProfessional() {
  const professionalId = localStorage.getItem("idProfessional");
  const id = Number(professionalId);

  
  if (!professionalId) {
    alert("No hay profesional registrado");
    return;
  }

  document
    .getElementById("button__add_schedule")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const agendaProfessional = getSchedule();

      try {
        const response = await api.post(
          `schedule/${id}`,
          agendaProfessional,
        );
        alert("Agenda agregada con exito");
        clearAllInputs();
        

      } catch (err) {
        alert("Error " + JSON.stringify(err.response.data));
        clearAllInputs();
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  scheduleProfessional();
});
