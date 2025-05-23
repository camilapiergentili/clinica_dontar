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
          `administrator-schedule/add-schedule/${id}`,
          agendaProfessional,
        );
        alert("Agenda agregada con exito");

        window.location.href =
          "/clinica_dontar/html/profile_administrator.html";
      } catch (err) {
        alert("Error " + JSON.stringify(err.response.data));
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  scheduleProfessional();
});
