async function getAppointmentProfessional() {
    
    const diasSemanaMap = {
        
        MONDAY: "Lunes",
        TUESDAY: "Martes",
        WEDNESDAY: "Miércoles",
        THURSDAY: "Jueves",
        FRIDAY: "Viernes",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo"
    };

    try{
        const response = await api.get("professionals/my-profile");
        const idProfesional = response.data.id;

        const responseSchedule = await api.get(`professionals/getSchedule/${idProfesional}`);
        const schedule = responseSchedule.data;

        schedule.forEach(agenda => {
            const day = agenda.day;
            const time = `${agenda.startTime} - ${agenda.endTime}`;
            const dayName = diasSemanaMap[day];

            const rows = document.querySelectorAll("table tr");

            rows.forEach(row => {
                const diaCelda = row.cells[0]?.textContent?.trim();

                if(diaCelda === dayName){
                    row.cells[1].textContent = time;
                }
            });


        });
    }
    catch(err) {
        alert(JSON.stringify(err.response.data));
    }
}

document.addEventListener("DOMContentLoaded", getAppointmentProfessional);