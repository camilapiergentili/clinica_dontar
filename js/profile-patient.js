document.addEventListener("DOMContentLoaded", async () => {
    try {
        
        const response = await api.get(`patient/my-profile`);
        const name = `${response.data.firstName} ${response.data.lastName}`;
        document.getElementById("nombre-patient").textContent = name;

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }
});