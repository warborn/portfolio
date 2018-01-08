import Chart from 'chart.js';

const englishCtx = document.getElementById('english-chart').getContext('2d');
const englishData = {
  labels: ['Speaking', 'Writting', 'Listening', 'Reading'],
  datasets: [{
    data: [55, 65, 80, 85],
    backgroundColor: [
      'rgba(39, 42, 50, 0.5)',
      'rgba(255, 255, 255, 0.5)',
      'rgba(179, 29, 49, 0.5)',
      'rgba(0, 0, 103, 0.5)'
    ],
    borderWidth: 0
  }]
};

const englishChart = new Chart(englishCtx, {
  data: englishData,
  type: 'polarArea',
  options: {
    scale: {
      gridLines: {
        color: 'rgba(255,255,255,0.1)'
      },
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return `${data.labels[tooltipItem.index]}: ${tooltipItem.yLabel}%`;
        } 
      }
    }
  }
});