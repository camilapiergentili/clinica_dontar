document.addEventListener("DOMContentLoaded", async () => {

    try{
        const response = await api.get("professionals/");
        const professionals = response.data;

        const tableBody = document.getElementById("profesionales-body");

        professionals.forEach(professional => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${professional.firstName}</td>
            <td>${professional.lastName}</td>
            <td>${professional.specialities.map(s => s.name).join(", ")}</td>
            `

            tableBody.appendChild(row);
        });
    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }

});