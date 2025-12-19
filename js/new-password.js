document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-change");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            oldPassword: document.getElementById("old-password").value,
            password: document.getElementById("new-password").value,
            confirmPassword: document.getElementById("confirm-password").value
        };
        
        try{
            await api.post("auth/change-password", data);
            alert("La contraseña se modifico correctamente")
        
        }
        catch (err){

            alert(JSON.stringify(err.response.data));
        }
    });

})