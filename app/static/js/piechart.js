$(document).ready(function () {

  // font styling
  Chart.defaults.font.family = 'Trueno';
  Chart.defaults.font.size = 14;
  // Chart.defaults.font.style = 'normal';
  // Chart.defaults.font.weight = 600;
  Chart.defaults.font.lineHeight = 1.733;

  // Chart.defaults.plugins.title.font.color = #000;
  Chart.defaults.plugins.title.font.size = 20;
  Chart.defaults.plugins.title.font.weight = 700;
  Chart.defaults.plugins.title.font.lineHeight = 1.5;

  // chart colors
  let colors = ['#c0c0c0','#f8c21c','#a51c30','#eb001b','#414141','#0579b8','#3e6f7d'];
  let lineColor = '#3e6f7d'

  let pieOptions1 = {
    legend: {
      position:'bottom',
      padding:5,
      labels: {
        pointStyle:'circle',
        usePointStyle:true
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by bytes",
        padding:{
          top:10,
          bottom:30
        }
      }
    }
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

  let pieOptions2 = {
    legend: {
      position:'bottom',
      padding:5,
      labels: {
        pointStyle:'circle',
        usePointStyle:true
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by objects",
        padding: {
          top:10,
          bottom:30
        }
      }
    }
  };
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


  // doughnut 1
  let doughnutOptions1 = {
    legend: {
      position:'bottom',
      padding:5,
      labels: {
        pointStyle:'circle',
        usePointStyle:true
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by bytes",
        padding:{
          top:10,
          bottom:30
        }
      }
    }
  };
  let doughnutData1 = {
    labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
    datasets: [
      {
        backgroundColor: colors.slice(0,7),
        borderWidth: 0,
        data: [2000, 700, 200, 350, 700, 500, 4000],
      }
    ]
  };
  let bytesChart = document.getElementById("bytesChart");
  if (bytesChart) {
    new Chart(bytesChart, {
      type: 'doughnut',
      data: doughnutData1,
      options: doughnutOptions1
    });
  }


  // doughnut 2
  let doughnutOptions2 = {
    legend: {
      position:'bottom',
      padding:5,
      labels: {
        pointStyle:'circle',
        usePointStyle:true
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by objects",
        padding: {
          top:10,
          bottom:30
        }
      }
    }
  };
  let doughnutData2 = {
    labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
    datasets: [
      {
        backgroundColor: colors.slice(0,7),
        borderWidth: 0,
        data: [10, 25, 50 ,40, 45, 30,10]
      }
    ]
  };
  var objectsChart = document.getElementById("objectsChart");
  if (objectsChart) {
    new Chart(objectsChart, {
      type: 'doughnut',
      data: doughnutData2,
      options: doughnutOptions2
    });
  }



  // line chart 1
  let lineOptions1 = {
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by files",
        padding:{
          top:10,
          bottom:30
        }
      }
    }
  };
  let lineData1 = {
    labels: ['Last week', 'Yesterday', 'Today'],
    datasets: [{
        label: 'Success',
        data: [2000, 3500, 6000],
        borderColor: colors[6],
        backgroundColor: colors[6],
        tension: 0.1
    },
    {
        label: 'Failure',
        data: [900, 780, 500],
        fill: false,
        borderColor: colors[2],
        backgroundColor: colors[2],
        tension: 0.1
    }]
  };
  let line1 = document.getElementById("line1");
  if (line1) {
    new Chart(line1, {
      type: 'line',
      data: lineData1,
      options: lineOptions1
    });
  }

  // let lineOptions2 = {
  //   interaction: {
  //     intersect: false,
  //     mode: 'index'
  //   },
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Progress by files",
  //       padding:{
  //         top:10,
  //         bottom:30
  //       }
  //     }
  //   },
  //   scales: {
  //     x: {
  //       type: 'time',
  //       time: {
  //         // Luxon format string
  //         tooltipFormat: 'DD T'
  //       },
  //       title: {
  //         display: true,
  //         text: 'Date'
  //       }
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: 'value'
  //       }
  //     }
  //   }
  // };
  // let lineData2 = {
  //   labels: [ // Date Objects
  //     Utils.newDate(0),
  //     Utils.newDate(1),
  //     Utils.newDate(2)
  //   ],
  //   datasets: [{
  //     label: 'Success',
  //     data: [2000, 3500, 6000],
  //     borderColor: colors[6],
  //     backgroundColor: colors[6]
  //   },{
  //     label: 'Failure',
  //     data: [900, 780, 500],
  //     fill: false,
  //     borderColor: colors[2],
  //     backgroundColor: colors[2]
  //   },{
  //     label: 'Test',
  //     fill: false,
  //     borderColor: colors[2],
  //     backgroundColor: colors[2],
  //     data: [{
  //       x: Utils.newDateString(0),
  //       y: Utils.rand(0,2000)
  //     },{
  //       x: Utils.newDateString(5),
  //       y: Utils.rand(0,2000)
  //     },{
  //       x: Utils.newDateString(7),
  //       y: Utils.rand(0,2000)
  //     }]
  //   }]
  // };
  // let line2 = document.getElementById("line2");
  // if (line2) {
  //   new Chart(line2, {
  //     type: 'line',
  //     data: lineData2,
  //     options: lineOptions2
  //   });
  // }

  // $('#myTabs button').click(function (e) {
  //    e.preventDefault();
  //    console.log(this);
  //    $(this).tab('show');
  // });


});
