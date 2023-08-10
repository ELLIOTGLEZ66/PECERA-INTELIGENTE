// chart.js

async function fetchTemperatureData() {
  const response = await fetch('/temperature');
  return await response.json();
}

async function fetchHumidityData() {
  const response = await fetch('/humidity');
  return await response.json();
}

async function drawCharts() {

  const temperatureData = await fetchTemperatureData();
  const humidityData = await fetchHumidityData();

  // Pintar datos de temperatura

  temperatureData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.value}</td>
      <td>${item.date}</td>  
    `;
    tempTable.appendChild(row);
  });

  const tempCtx = document.getElementById('tempChart').getContext('2d'); 

  const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
      labels: temperatureData.map(item => item.date),
      datasets: [{
        label: 'Temperature',
        data: temperatureData.map(item => item.value)  
      }]
    }
  });

  // Pintar datos de humedad

  humidityData.forEach(item => {
    
    // crear filas de tabla  
    // insertar en humidityTable
  
  });

  const humidCtx = document.getElementById('humidityChart').getContext('2d');

  const humidChart = new Chart(humidCtx, {
    // configuración gráfica humedad 
  });

}

drawCharts();