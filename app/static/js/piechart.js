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

      let i = data.length - 1; // last updated row, data[0] = headers

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
            hoverBackgroundColor: colors.slice(0,9),
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
            hoverBackgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: files_data.slice(0,9)
          }
        ]
      };
      let filesChart = $("#filesChart");
      if (filesChart) {
        new Chart(filesChart, {
          type: 'doughnut',
          data: filesChartData,
          options: filesChartOptions
        });
      }

      // objects chart
      let objectsChartOptions = {
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
            hoverBackgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: objects_data.slice(0,9)
          }
        ]
      };
      let objectsChart = $("#objectsChart");
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


      let skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
      let down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

      // bytes trends
      let bytesTrendsOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
            tension: 0.1,
            segment: {
              borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
              borderDash: ctx => skipped(ctx, [6, 6]),
            }
        }]
      };
      let bytesTrends = $("#bytesTrends");
      if (bytesTrends) {
        new Chart(bytesTrends, {
          type: 'line',
          data: bytesTrendsData,
          options: bytesTrendsOptions
        });
      }
      let bytesTrendsModal = $("#bytesTrendsModal");
      if (bytesTrendsModal) {
        new Chart(bytesTrendsModal, {
          type: 'line',
          data: bytesTrendsData,
          options: bytesTrendsOptions
        });
      }

      // files trends
      let filesTrendsOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
            tension: 0.1,
            segment: {
              borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
              borderDash: ctx => skipped(ctx, [6, 6]),
            }
        }]
      };
      let filesTrends = $("#filesTrends");
      if (filesTrends) {
        new Chart(filesTrends, {
          type: 'line',
          data: filesTrendsData,
          options: filesTrendsOptions
        });
      }
      let filesTrendsModal = $("#filesTrendsModal");
      if (filesTrendsModal) {
        new Chart(filesTrendsModal, {
          type: 'line',
          data: filesTrendsData,
          options: filesTrendsOptions
        });
      }

      // objects trends
      let objectsTrendsOptions = {
        responsive: true,
        maintainAspectRatio: false,
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
            tension: 0.1,
            segment: {
              borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
              borderDash: ctx => skipped(ctx, [6, 6]),
            }
        }]
      };
      let objectsTrends = $("#objectsTrends");
      if (objectsTrends) {
        new Chart(objectsTrends, {
          type: 'line',
          data: objectsTrendsData,
          options: objectsTrendsOptions
        });
      }
      let objectsTrendsModal = $("#objectsTrendsModal");
      if (objectsTrendsModal) {
        new Chart(objectsTrendsModal, {
          type: 'line',
          data: objectsTrendsData,
          options: objectsTrendsOptions
        });
      }


      // list of object ids for verify_failed
      let objFailed = ["482556371", "482559255", "482554466", "482559263", "482559259", "482556387", "482559267", "482583448", "402837016", "408748157", "408788027", "408807903", "409015554", "408756445", "409006283", "482659885", "409200207", "409023575", "482656585", "408959133", "409224029", "409022459", "409173959", "409016769", "409269448", "409684124", "409731627", "409376999", "409688525", "409645530", "409411763", "482757873", "409509889", "482765298", "409689690", "409547468", "409524660", "409830201", "409955289", "409938021", "482762430", "409956657", "48491625", "423493964"]
      for(i=0;i<objFailed.length;i++){
        $("#objects-failed table tbody").append(
          '<tr><td>'+objFailed[i]+'</td></tr>'
        );
      }

      // bytes regression
      let bytesScatterArray = []; // x and y values to plot
      let lr = {}; // object for regression stats
      let day = 0;
      linearRegression(bytesRemaining, bytesScatterArray);

      // calculate regression + create objects for scatter plot
      function linearRegression(y, scatterPlot){
        // let lr = {}; defined globally
        let n = 0;
        let sum_x = 0;
        let sum_y = 0;
        let sum_xy = 0;
        let sum_xx = 0;
        let sum_yy = 0;

        for (i = 12; i < y.length; i++) {
          // skip days we didn't collect data
          if (!(isNaN(y[i]))){
            sum_x += day;
            sum_y += y[i];
            sum_xy += (day*y[i]);
            sum_xx += (day*day);
            sum_yy += (y[i]*y[i]);
            n += 1;

            scatterPlot.push({x: day, y: y[i]});
          }

          day += 1;
        }

        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
      }

      let m = lr['slope'];
      let b = lr['intercept'];
      let bytesRegressionArray = [
        {x: 0, y: b},
        {x: day - 1, y: m*(day - 1) + b}
      ];

      // equation: y = mx * b
      let equation = "y = " + m.toFixed(2) + "x + " + b.toFixed(2);
      $(".hl__equation").html(equation)

      // projection when y = 0, minus # of days since started the verification process
      $(".hl__projection").html(((-b/m).toFixed(2)-(day)) + " days");

      let bytesRegressionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Best fitting regression line",
            padding:{
              top:10,
              bottom:10
            }
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days since started verifying data (7/27/21)'
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
            label: 'Data',
            data: bytesScatterArray,
            borderColor: colors[2],
            backgroundColor: colors[2],
            type: 'scatter'
        },{
            label: 'Linear regression',
            data: bytesRegressionArray,
            borderColor: colors[0],
            backgroundColor: colors[0],
            tension: 0.1,
            type: 'line'
        }]
      };
      let bytesRegression = $("#bytesRegression");
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
