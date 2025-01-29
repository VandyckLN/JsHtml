const data = {
    "source": "\"IBGE - Contas Nacionais Trimestrais\"",
    "title": "PIB a preços de mercado - Taxa acumulada em 4 trimestres",
    "valuesMap": {
      "Brasil": {
        "1º trimestre 2014": "3.2",
        "2º trimestre 2014": "2.1",
        "3º trimestre 2014": "1.2",
        "4º trimestre 2014": "0.5",
        "1º trimestre 2015": "-0.7",
        "2º trimestre 2015": "-1.3",
        "3º trimestre 2015": "-2.2",
        "4º trimestre 2015": "-3.5",
        "1º trimestre 2016": "-4.4",
        "2º trimestre 2016": "-4.5",
        "3º trimestre 2016": "-4.1",
        "4º trimestre 2016": "-3.3",
        "1º trimestre 2017": "-1.9",
        "2º trimestre 2017": "-0.9",
        "3º trimestre 2017": "0.1",
        "4º trimestre 2017": "1.3",
        "1º trimestre 2018": "1.7",
        "2º trimestre 2018": "1.9",
        "3º trimestre 2018": "2.0",
        "4º trimestre 2018": "1.8",
        "1º trimestre 2019": "1.5",
        "2º trimestre 2019": "1.4",
        "3º trimestre 2019": "1.2",
        "4º trimestre 2019": "1.2",
        "1º trimestre 2020": "1.1",
        "2º trimestre 2020": "-1.7",
        "3º trimestre 2020": "-2.8",
        "4º trimestre 2020": "-3.3",
        "1º trimestre 2021": "-2.9",
        "2º trimestre 2021": "2.4",
        "3º trimestre 2021": "4.3",
        "4º trimestre 2021": "4.8",
        "1º trimestre 2022": "4.7",
        "2º trimestre 2022": "2.7",
        "3º trimestre 2022": "2.7",
        "4º trimestre 2022": "3.0",
        "1º trimestre 2023": "3.8",
        "2º trimestre 2023": "3.8",
        "3º trimestre 2023": "3.3",
        "4º trimestre 2023": "3.2"
      }
    }
  };
  
  // Função para ordenar os dados por trimestre e ano
  function sortData(values) {
    return Object.entries(values).sort((a, b) => {
      const [aTrim, aYear] = a[0].split(' ').slice(1);
      const [bTrim, bYear] = b[0].split(' ').slice(1);
      const aDate = new Date(`${aYear}-${aTrim}`);
      const bDate = new Date(`${bYear}-${bTrim}`);
      return aDate - bDate;
    });
  }
  
  // Função para criar o gráfico de pizza
  function createChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    const values = sortData(data.valuesMap.Brasil);
    const labels = values.map(([key]) => key);
    const dataValues = values.map(([, value]) => parseFloat(value));
    const colors = [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
      '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
      '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
      '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'
    ];
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });
  }
  
  // Função para criar a tabela do top 10
  function createTable(data) {
    const tableContainer = document.getElementById('table-container');
    if (!tableContainer) {
      console.error('Elemento com ID "table-container" não encontrado.');
      return;
    }
    const values = sortData(data.valuesMap.Brasil);
    const sortedValues = values.slice(0, 10);
  
    let tableHTML = '<table><tr><th>Trimestre</th><th>PIB (%)</th></tr>';
    sortedValues.forEach(([key, value]) => {
      tableHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    tableHTML += '</table>';
  
    tableContainer.innerHTML = tableHTML;
  }
  
  // Função para criar a legenda
  function createLegend() {
    const legendContainer = document.getElementById('legend');
    if (!legendContainer) {
      console.error('Elemento com ID "legend" não encontrado.');
      return;
    }
    const colors = [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
      '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
      '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
      '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'
    ];
  
    let legendHTML = '';
    for (let i = 0; i < colors.length; i++) {
      legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color: ${colors[i]};"></div>Trimestre ${i + 1}</div>`;
    }
  
    legendContainer.innerHTML = legendHTML;
  }
  
  // Chama as funções para criar o gráfico, a tabela e a legenda
  createChart(data);
  createTable(data);
  createLegend();