let puntuaciones = [];

function evaluar() {
  puntuaciones = [];
  let total = 0;
  const totalPreguntas = 5;

  for (let i = 1; i <= totalPreguntas; i++) {
    const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
    const valor = respuesta ? parseInt(respuesta.value) : 0;
    puntuaciones.push(valor);
    total += valor;
  }

  document.getElementById('resultado').innerText =
    `Tu puntuación es: ${total} de ${totalPreguntas}`;
  
  mostrarGrafico();
}

function mostrarGrafico() {
  const ctx = document.getElementById('resultChart').getContext('2d');
  if (window.resultadoChart) {
    window.resultadoChart.destroy();
  }

  window.resultadoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5'],
      datasets: [{
        label: 'Puntos por pregunta',
        data: puntuaciones,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 1 }
      }
    }
  });
}

async function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Resultado del Cuestionario de Minecraft", 10, 10);
  doc.text(`Puntuación total: ${puntuaciones.reduce((a,b) => a+b, 0)} de 5`, 10, 20);

  const canvas = document.getElementById('resultChart');
  const imgData = canvas.toDataURL("image/png", 1.0);
  doc.addImage(imgData, 'PNG', 10, 30, 180, 100);

  doc.save("resultado_minecraft.pdf");
}
