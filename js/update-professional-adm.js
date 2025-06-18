function buscarProfessionalPorDni() {
  const button_buscar = document.getElementById("button_search");

  button_buscar.addEventListener("click", async (event) => {
    event.preventDefault();

    const dni = document.getElementById("dni").value;

    try {
      const response = await api.get(`administrator-professional/find-by-dni/${dni}`);
      const data = response.data;

      localStorage.setItem("idProfessional", data.id);

      document.getElementById("nombre").value = data.firstName;
      document.getElementById("apellido").value = data.lastName;
      document.getElementById("matricula").value = data.matricula;
      document.getElementById("email").value = data.username;


      document.getElementById("div__personal_data").style.display = "block";
      document.getElementById("mensajeError").style.display = "none";
      document.getElementById("datosProfesional").style.display = "block";


    } catch (err) {

      document.getElementById("div__personal_data").style.display = "none";
      document.getElementById("mensajeError").style.display = "block";
      document.getElementById("datosProfesional").style.display = "none";
      alert(JSON.stringify(err.response.data));

    }

  });

}

function update() {

  const form = document.getElementById("datosProfesional");

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = localStorage.getItem("idProfessional");
    
    professionalActualizado = {
      dni: document.getElementById("dni").value,
      firstName: document.getElementById("nombre").value,
      lastName: document.getElementById("apellido").value,
      matricula: document.getElementById("matricula").value,
      username: document.getElementById("email").value
    }

    try{
      await api.put(`professional/update?id=${id}`, professionalActualizado);
      alert("Profesional modificado con exito ");

    }
    catch(err)  {
      alert(JSON.stringify(err.response.data));
    }
    
  });
}

document.addEventListener("DOMContentLoaded", () => {

  buscarProfessionalPorDni(),
  update()

} );
