$(document).ready(function () {

  // font styling
  Chart.defaults.color = '#1e1e1e';
  Chart.defaults.font.family = 'Trueno';
  Chart.defaults.font.size = 14;
  // Chart.defaults.font.style = 'normal';
  Chart.defaults.font.weight = 300;
  Chart.defaults.font.lineHeight = 1.733;

  // Chart.defaults.plugins.title.font.color = #000;
  Chart.defaults.plugins.title.font.size = 20;
  Chart.defaults.plugins.title.font.weight = 700;
  Chart.defaults.plugins.title.font.lineHeight = 1.5;

  // chart colors
  let colors = ['#c0c0c0','#f8c21c','#a51c30','#eb001b','#414141','#0579b8','#8DBA4B','#3E6F7D','red'];
  let lineColor = '#3e6f7d';

  // labels
  let labels = ['Pending', 'In process', 'Failure', 'Unrecoverable', 'Sensitive', 'On hold', 'Success', 'Verified', 'Verified failed'];

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
        data[i]["gsx$bybytes"]["$t"], //pending
        data[i]["gsx$_cre1l"]["$t"],  // in process
        data[i]["gsx$_chk2m"]["$t"],  // failure
        data[i]["gsx$_ciyn3"]["$t"],  // unrecoverable
        data[i]["gsx$_ckd7g"]["$t"],  // sensitive
        data[i]["gsx$_clrrx"]["$t"],  // on hold
        data[i]["gsx$_cyevm"]["$t"],  // success
        data[i]["gsx$_cztg3"]["$t"],  // verified
        data[i]["gsx$_d180g"]["$t"]   // verified failed
      ];

      let bytes_total = data[i]["gsx$_d2mkx"]["$t"]; // total
      let bytes_percent_complete = data[i]["gsx$_cssly"]["$t"]; // % complete

      let files_data = [
        data[i]["gsx$byfiles"]["$t"], //pending
        data[i]["gsx$_cvlqs"]["$t"],  // in process
        data[i]["gsx$_cx0b9"]["$t"],  // failure
        data[i]["gsx$_d9ney"]["$t"],  // unrecoverable
        data[i]["gsx$_db1zf"]["$t"],  // sensitive
        data[i]["gsx$_dcgjs"]["$t"],  // on hold
        data[i]["gsx$_ddv49"]["$t"],  // success
        data[i]["gsx$_d415a"]["$t"],  // verified
        data[i]["gsx$_d5fpr"]["$t"]   // verified failed
      ];

      let files_total = data[i]["gsx$_d6ua4"]["$t"]; // total
      let files_percent_complete = data[i]["gsx$_d88ul"]["$t"]; // % complete

      let objects_data = [
        data[i]["gsx$byobjects"]["$t"], //pending
        data[i]["gsx$_dmair"]["$t"],    // in process
        data[i]["gsx$_dnp34"]["$t"],    // failure
        data[i]["gsx$_dp3nl"]["$t"],    // unrecoverable
        data[i]["gsx$_df9om"]["$t"],    // sensitive
        data[i]["gsx$_dgo93"]["$t"],    // on hold
        data[i]["gsx$_di2tg"]["$t"],    // success
        data[i]["gsx$_djhdx"]["$t"],    // verified
        data[i]["gsx$_dw4je"]["$t"]     // verified failed
      ];

      let objects_total = data[i]["gsx$_dxj3v"]["$t"]; // total
      let objects_percent_complete = data[i]["gsx$_dyxo8"]["$t"]; // % complete

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
              bottom:10
            }
          }
        }
      };
      let bytesChartData = {
        labels: labels.slice(0,7),
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            hoverBackgroundColor: colors.slice(0,7),
            borderWidth: 1,
            data: bytes_data.slice(0,7),
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

      // files chart
      let filesChartOptions = {
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
            text: "Progress by files",
            padding: {
              top:10,
              bottom:10
            }
          }
        }
      };
      let filesChartData = {
        labels: labels.slice(0,7),
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            borderWidth: 1,
            data: files_data.slice(0,7)
          }
        ]
      };
      var filesChart = document.getElementById("filesChart");
      if (filesChart) {
        new Chart(filesChart, {
          type: 'doughnut',
          data: filesChartData,
          options: filesChartOptions
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
              bottom:10
            }
          }
        }
      };
      let objectsChartData = {
        labels: labels.slice(0,7),
        datasets: [
          {
            backgroundColor: colors.slice(0,7),
            borderWidth: 1,
            data: objects_data.slice(0,7)
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


      // table views
      createTable("#bytes-numbers", bytes_data, bytes_total, bytes_percent_complete);
      createTable("#files-numbers", files_data, files_total, files_percent_complete);
      createTable("#objects-numbers", objects_data, objects_total, objects_percent_complete);


      // create arrays for trends graphs
      let dateArray = [];
      let bytesRemaining = [];
      let filesRemaining = [];
      let objectsRemaining = [];

      for(i=1;i<data.length;i++){
        dateArray.push(data[i]["gsx$date"]["$t"]); // array of dates for x-axis

        calcRemaining(bytesRemaining, data[i]["gsx$_d2mkx"]["$t"], data[i]["gsx$_cyevm"]["$t"], 12);

        calcRemaining(filesRemaining, data[i]["gsx$_d6ua4"]["$t"], data[i]["gsx$_ddv49"]["$t"], 6);

        calcRemaining(objectsRemaining, data[i]["gsx$_dxj3v"]["$t"], data[i]["gsx$_di2tg"]["$t"], 3);
      }

      // bytes trends
      let bytesTrendsOptions = {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          title: {
            display: true,
            text: "Progress by bytes",
            padding:{
              top:10,
              bottom:10
            }
          }
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'TB remaining'
            }
          }
        }
      };
      let bytesTrendsData = {
        labels: dateArray,
        datasets: [{
            label: 'Total TB remaining',
            data: bytesRemaining,
            borderColor: colors[2],
            backgroundColor: colors[2],
            tension: 0.1
        }]
      };
      let bytesTrends = document.getElementById("bytesTrends");
      if (bytesTrends) {
        new Chart(bytesTrends, {
          type: 'line',
          data: bytesTrendsData,
          options: bytesTrendsOptions
        });
      }
      let bytesTrendsModal = document.getElementById("bytesTrendsModal");
      if (bytesTrendsModal) {
        new Chart(bytesTrendsModal, {
          type: 'line',
          data: bytesTrendsData,
          options: bytesTrendsOptions
        });
      }

      // files trends
      let filesTrendsOptions = {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          title: {
            display: true,
            text: "Progress by files",
            padding:{
              top:10,
              bottom:10
            }
          }
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'MB remaining'
            }
          }
        }
      };
      let filesTrendsData = {
        labels: dateArray,
        datasets: [{
            label: 'Total MB remaining',
            data: filesRemaining,
            borderColor: colors[2],
            backgroundColor: colors[2],
            tension: 0.1
        }]
      };
      let filesTrends = document.getElementById("filesTrends");
      if (filesTrends) {
        new Chart(filesTrends, {
          type: 'line',
          data: filesTrendsData,
          options: filesTrendsOptions
        });
      }
      let filesTrendsModal = document.getElementById("filesTrendsModal");
      if (filesTrendsModal) {
        new Chart(filesTrendsModal, {
          type: 'line',
          data: filesTrendsData,
          options: filesTrendsOptions
        });
      }

      // objects trends
      let objectsTrendsOptions = {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false
          },
          title: {
            display: true,
            text: "Progress by objects",
            padding:{
              top:10,
              bottom:10
            }
          }
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'KB Remaining'
            }
          }
        }
      };
      let objectsTrendsData = {
        labels: dateArray,
        datasets: [{
            label: 'Total KB remaining',
            data: objectsRemaining,
            borderColor: colors[2],
            backgroundColor: colors[2],
            tension: 0.1
        }]
      };
      let objectsTrends = document.getElementById("objectsTrends");
      if (objectsTrends) {
        new Chart(objectsTrends, {
          type: 'line',
          data: objectsTrendsData,
          options: objectsTrendsOptions
        });
      }
      let objectsTrendsModal = document.getElementById("objectsTrendsModal");
      if (objectsTrendsModal) {
        new Chart(objectsTrendsModal, {
          type: 'line',
          data: objectsTrendsData,
          options: objectsTrendsOptions
        });
      }


      // list of object ids for verified_failed
      let objFailed = [482556371, 482559255, 482554466, 482559263, 482559259, 482556387, 482559267]
      for(i=0;i<objFailed.length;i++){
        $("#objects-failed table tbody").append(
          '<tr><td>'+objFailed[i]+'</td></tr>'
        );
      }
    }
  };

  xmlhttp.open(
    "GET",
    "https://spreadsheets.google.com/feeds/list/1FFv-csMLes-c6rQWCQBZa1PvrlY0b78XpQs8LpppUZA/2/public/values?alt=json",
    true
  );
  xmlhttp.send();


  // create tables
  function createTable(dataId, data, dataTotal, dataComplete){
    let $el = $(dataId);
    let dataTable = $el.find("tbody");
    for(i=0;i<labels.length;i++){
      $(dataTable).append(
        '<tr><td>'+labels[i]+'</td><td>'+numberWithCommas(data[i])+'</td></tr>'
      );
    }
    $(dataTable).append(
      '<tr><td>Total</td><td>'+numberWithCommas(dataTotal)+'</td></tr><tr><td>% complete</td><td>'+dataComplete+'</td></tr>'
    );
  }

  // add commas to numbers in table view
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // create array of total amount remaining
  function calcRemaining(array, total, success, exponent){
    let remaining = parseInt(total) - parseInt(success);
    array.push(remaining/(10**exponent));
  }
});
