function calcular() {
    const horas = parseInt(document.getElementById('horas').value);
    const tipoAuto = document.getElementById('tipo');
    const precioPorHora = parseInt(tipoAuto.value);
    const tipoAutoTexto = tipoAuto.options[tipoAuto.selectedIndex].text;
    
    if (isNaN(horas)) {
        alert("Por favor ingresa el número de horas");
        return;
    }
    
    const total = horas * precioPorHora;
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <strong>Total a pagar:</strong> $${total.toFixed(2)}<br>
        <small>Por ${horas} horas de estacionamiento para ${tipoAutoTexto}</small>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calcular').addEventListener('click', calcular);
});