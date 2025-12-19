document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await api.get("professionals/my-profile");
        const name = `Dr/a ${response.data.firstName} ${response.data.lastName}`;
        document.getElementById("name-professional").textContent = name;

    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }
});