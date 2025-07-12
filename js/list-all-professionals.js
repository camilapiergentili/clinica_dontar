document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();

    await api.get("/professionals/")
    .then(response => {
        const professionals = response.data;

        const tableBody = document.getElementById("profesionales-body");

        professionals.forEach(profesional => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${profesional.dni}</td>
                <td>${profesional.firstName}</td>
                <td>${profesional.lastName}</td>
                <td>${profesional.username}</td>
                <td>${profesional.matricula}</td>
                <td>${profesional.specialities.map(s => s.name).join(", ")}</td>
            `;

            tableBody.appendChild(row);
        });
    });

});
