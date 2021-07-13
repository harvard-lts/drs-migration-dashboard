$(document).ready(function () {

// chart colors
  let colors = ['#909091','#e5ff00','#ff0000','#ff9d00','#e100ff','#0044ff', '#00ff00'];


  let pieOptions1 = {
    cutoutPercentage: 85,
    legend: {position:'bottom', padding:5, labels: {pointStyle:'circle', usePointStyle:true}},
    plugins: {title: {display: true, text: "Progress by bytes", padding:{top:10, bottom:30}}}
  };

  let pieOptions2 = {
    cutoutPercentage: 85,
    legend: {position:'bottom', padding:5, labels: {pointStyle:'circle', usePointStyle:true}},
    plugins: {title: {display: true, text: "Progress by objects", padding:{top:10, bottom:30}}}
  };

  let pieData1 = {
    labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
    datasets: [
      {
        backgroundColor: colors.slice(0,7),
        borderWidth: 0,
        data: [2000, 700, 200, 350, 700, 500, 4000],
      }
    ]
  };

  let pie1 = document.getElementById("pie1");
  if (pie1) {
    new Chart(pie1, {
      type: 'pie',
      data: pieData1,
      options: pieOptions1
    });
  }

  let pieData2 = {
    labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
    datasets: [
      {
        backgroundColor: colors.slice(0,7),
        borderWidth: 0,
        data: [10, 25, 50 ,40, 45, 30,10]
      }
    ]
  };
  var pie2 = document.getElementById("pie2");
  if (pie2) {
    new Chart(pie2, {
      type: 'pie',
      data: pieData2,
      options: pieOptions2
    });
  }

});