$(document).ready(function () {

  // font styling
  Chart.defaults.color = '#1e1e1e';
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
  let lineColor = '#3e6f7d';

  // labels
  let labels = ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'];

  // let pieOptions1 = {
  //   legend: {
  //     position:'bottom',
  //     padding:5,
  //     labels: {
  //       pointStyle:'circle',
  //       usePointStyle:true
  //     }
  //   },
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Progress by bytes",
  //       padding:{
  //         top:10,
  //         bottom:30
  //       }
  //     }
  //   }
  // };
  // let pieData1 = {
  //   labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
  //   datasets: [
  //     {
  //       backgroundColor: colors.slice(0,7),
  //       borderWidth: 0,
  //       data: [2000, 700, 200, 350, 700, 500, 4000],
  //     }
  //   ]
  // };
  // let pie1 = document.getElementById("pie1");
  // if (pie1) {
  //   new Chart(pie1, {
  //     type: 'pie',
  //     data: pieData1,
  //     options: pieOptions1
  //   });
  // }
  //
  // let pieOptions2 = {
  //   legend: {
  //     position:'bottom',
  //     padding:5,
  //     labels: {
  //       pointStyle:'circle',
  //       usePointStyle:true
  //     }
  //   },
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Progress by objects",
  //       padding: {
  //         top:10,
  //         bottom:30
  //       }
  //     }
  //   }
  // };
  // let pieData2 = {
  //   labels: ['Pending', 'In Process', 'Failure', 'Unrecoverable', 'Sensitive', 'On Hold', 'Success'],
  //   datasets: [
  //     {
  //       backgroundColor: colors.slice(0,7),
  //       borderWidth: 0,
  //       data: [10, 25, 50 ,40, 45, 30,10]
  //     }
  //   ]
  // };
  // var pie2 = document.getElementById("pie2");
  // if (pie2) {
  //   new Chart(pie2, {
  //     type: 'pie',
  //     data: pieData2,
  //     options: pieOptions2
  //   });
  // }

  // google spreadsheet request
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText).feed.entry;

      let i = data.length - 1; // last updated row

      let date = data[i]["gsx$date"]["$t"];
      let time = data[i]["gsx$time"]["$t"];

      $(".hl__date").html(date);
      $(".hl__time").html(time);

      let bytes_data = [
        data[i]["gsx$bybytescount"]["$t"],
        data[i]["gsx$_cre1l"]["$t"],
        data[i]["gsx$_chk2m"]["$t"],
        data[i]["gsx$_ciyn3"]["$t"],
        data[i]["gsx$_ckd7g"]["$t"],
        data[i]["gsx$_clrrx"]["$t"],
        data[i]["gsx$_cyevm"]["$t"]
      ];

      let bytes_total = data[i]["gsx$_cztg3"]["$t"];
      let bytes_percent_complete = data[i]["gsx$_d180g"]["$t"];

      let filesize_data = [
        data[i]["gsx$byfilesize"]["$t"],
        data[i]["gsx$_cssly"]["$t"],
        data[i]["gsx$_cu76f"]["$t"],
        data[i]["gsx$_cvlqs"]["$t"],
        data[i]["gsx$_cx0b9"]["$t"],
        data[i]["gsx$_d9ney"]["$t"],
        data[i]["gsx$_db1zf"]["$t"]
      ];

      let filesize_total = data[i]["gsx$_dcgjs"]["$t"];
      let filesize_percent_complete = data[i]["gsx$_ddv49"]["$t"];

      let objects_data = [
        data[i]["gsx$byobjects"]["$t"],
        data[i]["gsx$_d5fpr"]["$t"],
        data[i]["gsx$_d6ua4"]["$t"],
        data[i]["gsx$_d88ul"]["$t"],
        data[i]["gsx$_dkvya"]["$t"],
        data[i]["gsx$_dmair"]["$t"],
        data[i]["gsx$_dnp34"]["$t"]
      ];

      let objects_total = data[i]["gsx$_dp3nl"]["$t"];
      let objects_percent_complete = data[i]["gsx$_df9om"]["$t"];

      console.log(bytes_data);
      console.log(filesize_data);
      console.log(objects_data);

      // bytes chart
      let bytesChartOptions = {
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
      let bytesChartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            borderWidth: 0,
            data: bytes_data,
          }
        ]
      };
      let bytesChart = $("#bytesChart");
      if (bytesChart) {
        new Chart(bytesChart, {
          type: 'doughnut',
          data: bytesChartData,
          options: bytesChartOptions
        });
      }

      // objects chart
      let objectsChartOptions = {
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
      let objectsChartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            borderWidth: 0,
            data: objects_data
          }
        ]
      };
      var objectsChart = document.getElementById("objectsChart");
      if (objectsChart) {
        new Chart(objectsChart, {
          type: 'doughnut',
          data: objectsChartData,
          options: objectsChartOptions
        });
      }

      // filesize chart
      let filesizeChartOptions = {
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
            text: "Progress by filesize",
            padding: {
              top:10,
              bottom:30
            }
          }
        }
      };
      let filesizeChartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            borderWidth: 0,
            data: filesize_data
          }
        ]
      };
      var filesizeChart = document.getElementById("filesizeChart");
      if (filesizeChart) {
        new Chart(filesizeChart, {
          type: 'doughnut',
          data: filesizeChartData,
          options: filesizeChartOptions
        });
      }

      // create tables
      function createTable(dataId, data, dataTotal, dataComplete){
        let $el = $(dataId);
        let dataTable = $el.find("tbody");
        for(i=0;i<labels.length;i++){
          $(dataTable).append(
            '<tr><td>'+labels[i]+'</td><td>'+data[i]+'</dt></tr>'
          );
        }
        $(dataTable).append(
          '<tr><td>Total</td><td>'+dataTotal+'</dt></tr><tr><td>% Complete</td><td>'+dataComplete+'</dt></tr>'
        );
      }

      createTable("#bytes-numbers", bytes_data, bytes_total, bytes_percent_complete);
      createTable("#objects-numbers", objects_data, objects_total, objects_percent_complete);
      createTable("#filesize-numbers", filesize_data, filesize_total, filesize_percent_complete);
    }
  };

  xmlhttp.open(
    "GET",
    "https://spreadsheets.google.com/feeds/list/1FFv-csMLes-c6rQWCQBZa1PvrlY0b78XpQs8LpppUZA/od6/public/values?alt=json",
    true
  );
  xmlhttp.send();









  // line chart 1
  let lineOptions1 = {
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      title: {
        display: true,
        text: "Progress by file size",
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


});
