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
  let colors = ['#c0c0c0','#f8c21c','#a51c30','#eb001b','#414141','#0579b8','#3E6F7D','#8DBA4B','red'];
  let lineColor = '#3e6f7d';

  // labels
  let labels = ['Pending', 'In process', 'Failure', 'Unrecoverable', 'Sensitive', 'On hold', 'Needs verification', 'Verified', 'Verify failed'];

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
        data[i]["gsx$_cyevm"]["$t"],  // needs verification
        data[i]["gsx$_cztg3"]["$t"],  // verified
        data[i]["gsx$_d180g"]["$t"]   // verify failed
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
        data[i]["gsx$_ddv49"]["$t"],  // needs verification
        data[i]["gsx$_d415a"]["$t"],  // verified
        data[i]["gsx$_d5fpr"]["$t"]   // verify failed
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
        data[i]["gsx$_di2tg"]["$t"],    // needs verification
        data[i]["gsx$_djhdx"]["$t"],    // verified
        data[i]["gsx$_dw4je"]["$t"]     // verify failed
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
        labels: labels.slice(0,9),
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: bytes_data.slice(0,9),
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
        labels: labels.slice(0,9),
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: files_data.slice(0,9)
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
        labels: labels.slice(0,9),
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: objects_data.slice(0,9)
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

        calcRemaining(bytesRemaining, data[i]["gsx$_d2mkx"]["$t"], data[i]["gsx$_cztg3"]["$t"], 12);

        calcRemaining(filesRemaining, data[i]["gsx$_d6ua4"]["$t"], data[i]["gsx$_d415a"]["$t"], 6);

        calcRemaining(objectsRemaining, data[i]["gsx$_dxj3v"]["$t"], data[i]["gsx$_djhdx"]["$t"], 3);
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
            label: 'Total TB remaining to be verified',
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
            label: 'Total MB remaining to be verified',
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
            label: 'Total KB remaining to be verified',
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


      // list of object ids for verify_failed
      let objFailed = [482556371, 482559255, 482554466, 482559263, 482559259, 482556387, 482559267]
      for(i=0;i<objFailed.length;i++){
        $("#objects-failed table tbody").append(
          '<tr><td>'+objFailed[i]+'</td></tr>'
        );
      }

      // bytes regression
      let bytesScatterArray = []; // x and y values to plot
      let lr = {}; // object for regression stats
      linearRegression(bytesRemaining, bytesScatterArray);

      // calculate regression + create objects for scatter plot
      function linearRegression(y, scatterPlot){
        // var lr = {}; defined globally
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {
            sum_x += i;
            sum_y += y[i];
            sum_xy += (i*y[i]);
            sum_xx += (i*i);
            sum_yy += (y[i]*y[i]);
        }

        for (var i = 0; i < 16; i++) {
            scatterPlot.push({x: i, y: y[i]});
        }

        for (var i = 16; i < y.length; i++) {
            scatterPlot.push({x: i+4, y: y[i]});
        }

        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

        console.log(lr);
      }

      let m = lr['slope'];
      let b = lr['intercept'];
      let bytesRegressionArray = [
        {x: 0,y: b},
        {x: data.length + 2,y: m*(data.length + 2) + b}
      ];

      // equation: y = mx * b
      $(".hl__equation").html("y = " + m.toFixed(2) + "x + " + b.toFixed(2))
      // projection when y = 0, minus # of days since started tracking
      $(".hl__projection").html((-b/m - (data.length + 3)).toFixed(2) + " days");

      console.log("bytesScatterArray:");
      console.log(bytesScatterArray);
      console.log("bytesRegressionArray:");
      console.log(bytesRegressionArray);
      console.log("data.length:");
      console.log(data.length);

      let bytesRegressionOptions = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Best fitting regression line",
            padding:{
              top:10,
              bottom:10
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days since started collecting data'
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
      let bytesRegressionData = {
        datasets: [{
            label: 'Scatter plot',
            data: bytesScatterArray,
            borderColor: colors[2],
            backgroundColor: colors[2],
            type: 'scatter'
        },{
            label: 'Linear regression line',
            data: bytesRegressionArray,
            borderColor: colors[0],
            backgroundColor: colors[0],
            tension: 0.1,
            type: 'line'
        }]
      };
      let bytesRegression = document.getElementById("bytesRegression");
      if (bytesRegression) {
        new Chart(bytesRegression, {
          type: 'scatter',
          data: bytesRegressionData,
          options: bytesRegressionOptions
        });
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
  function calcRemaining(array, total, verified, exponent){
    let remaining = parseInt(total) - parseInt(verified);
    array.push(remaining/(10**exponent));
  }
});
