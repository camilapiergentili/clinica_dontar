const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const horas = [];
for (let h = 8; h <= 22; h++) {
  for (let m = 0; m < 60; m += 15) {
    horas.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  }
}

const thead = document.getElementById('theadTurnos');
const tbody = document.getElementById('tbodyTurnos');
let turnos = [];
let semanaActual = obtenerLunesDesdeHoy(0);

function obtenerLunesDesdeHoy(offset = 0) {
  const hoy = new Date();
  const dia = hoy.getDay();
  const diff = dia === 0 ? -6 : 1 - dia;
  hoy.setDate(hoy.getDate() + diff + offset * 7);
  hoy.setHours(0, 0, 0, 0);
  return hoy;
}

async function cargarTurnosSemana() {
  try {
    const turnosSemana = [];

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(semanaActual);
      fecha.setDate(fecha.getDate() + i);
      const fechaStr = fecha.toISOString().split('T')[0];

      const response = await api.get('/appointment/all', {
        params: {
          date: fechaStr
        }
      });

      turnosSemana.push(...(response.data || []));
    }

    turnos = turnosSemana;
    renderTabla();
    actualizarRangoSemana(); 
  } catch (e) {
    console.error('Error al cargar turnos:', e);
  }
}


function renderTabla() {
  const fechasEncabezado = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(semanaActual);
    fecha.setDate(fecha.getDate() + i);

    const nombreDia = diasSemana[i];
    const diaNumero = fecha.getDate().toString().padStart(2, '0');
    fechasEncabezado.push(`${nombreDia} ${diaNumero}`);
  }

  thead.innerHTML = '<tr><th>Horario</th>' + fechasEncabezado.map(d => `<th>${d}</th>`).join('') + '</tr>';
  tbody.innerHTML = '';

  for (const hora of horas) {
    const fila = document.createElement('tr');
    fila.appendChild(crearCelda(hora, true));

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(semanaActual);
      fecha.setDate(fecha.getDate() + i);
      const diaStr = fecha.toISOString().split('T')[0];

      const turno = turnos.find(t =>
        t.dayAppointment === diaStr &&
        t.timeAppointment.startsWith(hora)
      );

      const celda = crearCelda();

      if (turno) {
        if (turno.status === 'RESERVADO') {
          celda.style.backgroundColor = '#f8bbd0';
          celda.textContent = turno.namePatient || 'Reservado';
        } else if (turno.status === 'DISPONIBLE') {
          celda.style.backgroundColor = '#c8e6c9'; 
          celda.textContent = 'Disponible';
        }
      } else {
        celda.style.backgroundColor = '#eee'; 
      }

      fila.appendChild(celda);
    }

    tbody.appendChild(fila);
  }
}

function crearCelda(texto = '', isHora = false) {
  const td = document.createElement('td');
  td.textContent = texto;
  if (isHora) {
    td.style.fontWeight = 'bold';
    td.style.backgroundColor = '#f0f0f0';
  }
  return td;
}

function actualizarRangoSemana() {
  const inicio = new Date(semanaActual);
  const fin = new Date(semanaActual);
  fin.setDate(fin.getDate() + 6);

  const opciones = { month: 'long', year: 'numeric' };
  const mesInicio = inicio.toLocaleDateString('es-ES', opciones);
  const mesFin = fin.toLocaleDateString('es-ES', opciones);

  const textoMes = mesInicio === mesFin ? mesInicio : `${mesInicio} - ${mesFin}`;
  document.getElementById('rangoSemana').textContent =
    textoMes.charAt(0).toUpperCase() + textoMes.slice(1);
}


document.querySelector('.semana_anterior').addEventListener('click', () => {
  semanaActual.setDate(semanaActual.getDate() - 7);
  cargarTurnosSemana();
});

document.querySelector('.semana_siguiente').addEventListener('click', () => {
  semanaActual.setDate(semanaActual.getDate() + 7);
  cargarTurnosSemana();
});


cargarTurnosSemana();

