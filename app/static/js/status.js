$(document).ready(function () {

  // font styling
  Chart.defaults.color = '#1e1e1e';
  Chart.defaults.font.family = 'Trueno';
  Chart.defaults.font.size = 14;
  Chart.defaults.font.weight = 300;
  Chart.defaults.font.lineHeight = 1.733;

  Chart.defaults.plugins.title.font.size = 20;
  Chart.defaults.plugins.title.font.weight = 700;
  Chart.defaults.plugins.title.font.lineHeight = 1.5;

  // chart colors
  let colors = ['#c0c0c0','#f8c21c','#a51c30','#eb001b','#414141','#0579b8','#3E6F7D','#8DBA4B','red'];
  let chartColors = ['#414141','#f8c21c','#a51c30','#8DBA4B'];
  let lineColor = '#a51c30';

  // labels
  let chartLabels = ['Pending', 'Migrated', 'Failed migration', 'Verified'];
  let tableLabels = ['Pending','In process','On hold','Sensitive','Needs verification','Failure','Verify failed','Verified','Unrecoverable*'];

  let data = JSON.parse(migration_data);

  let i = data.length - 1; // last updated row, data[0] = headers

  let date = data[i]["Date"];

  $(".hl__date").html(date);

  let bytes_data = [
    data[i]["PendingBytes"],            // pending
    data[i]["In ProcessBytes"],         // in process
    data[i]["On holdBytes"],            // on hold
    data[i]["SensitiveBytes"],          // sensitive
    data[i]["Needs verificationBytes"], // needs verification
    data[i]["FailureBytes"],            // failure
    data[i]["Verify failedBytes"],      // verify failed
    data[i]["VerifiedBytes"],           // verified
    data[i]["UnrecoverableBytes"]       // unrecoverable
  ];

  let bytes_total = data[i]["TotalBytes"]; // total
  let bytes_percent_complete = data[i]["% CompleteBytes"]; // % complete

  let files_data = [
    data[i]["PendingFiles"],            // pending
    data[i]["In ProcessFiles"],         // in process
    data[i]["On holdFiles"],            // on hold
    data[i]["SensitiveFiles"],          // sensitive
    data[i]["Needs verificationFiles"], // needs verification
    data[i]["FailureFiles"],            // failure
    data[i]["Verify failedFiles"],      // verify failed
    data[i]["VerifiedFiles"],           // verified
    data[i]["UnrecoverableFiles"]       // unrecoverable
  ];

  let files_total = data[i]["TotalFiles"]; // total
  let files_percent_complete = data[i]["% CompleteFiles"]; // % complete

  let objects_data = [
    data[i]["PendingObject"],             // pending
    data[i]["In ProcessObject"],          // in process
    data[i]["On holdObject"],             // on hold
    data[i]["SensitiveObject"],           // sensitive
    data[i]["Needs verificationObject"],  // needs verification
    data[i]["FailureObject"],             // failure
    data[i]["Verify failedObject"],       // verify failed
    data[i]["VerifiedObject"],            // verified
    data[i]["UnrecoverableObject"]        // unrecoverable
  ];

  let objects_total = data[i]["TotalObject"]; // total
  let objects_percent_complete = data[i]["% CompleteObject"]; // % complete

  let bytes_chart = [];
  let files_chart = [];
  let objects_chart = [];
  createChartData(bytes_data,bytes_chart);
  createChartData(files_data,files_chart);
  createChartData(objects_data,objects_chart);

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
    labels: chartLabels.slice(0,4),
    datasets: [
      {
        backgroundColor: chartColors.slice(0,4),
        hoverBackgroundColor: chartColors.slice(0,4),
        borderWidth: 1,
        data: bytes_chart.slice(0,4),
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
    labels: chartLabels.slice(0,4),
    datasets: [
      {

        backgroundColor: chartColors.slice(0,4),
        hoverBackgroundColor: chartColors.slice(0,4),
        borderWidth: 1,
        data: files_chart.slice(0,4)
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
    labels: chartLabels.slice(0,4),
    datasets: [
      {
        backgroundColor: chartColors.slice(0,4),
        hoverBackgroundColor: chartColors.slice(0,4),
        borderWidth: 1,
        data: objects_chart.slice(0,4)
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
    dateArray.push(data[i]["Date"]); // array of dates for x-axis

    calcRemaining(bytesRemaining, data[i]["TotalBytes"], data[i]["VerifiedBytes"], 12);
    calcRemaining(filesRemaining, data[i]["TotalFiles"], data[i]["VerifiedFiles"], 6);
    calcRemaining(objectsRemaining, data[i]["TotalObject"], data[i]["VerifiedObject"], 6);
  }


  let skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
  let down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  let skippedSegment = {
    borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
    borderDash: ctx => skipped(ctx, [6, 6]),
  }

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
        },
        suggestedMin: 0
      }
    }
  };
  let bytesTrendsData = {
    labels: dateArray,
    datasets: [{
        label: 'Total remaining to be verified',
        data: bytesRemaining,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.1,
        segment: skippedSegment
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
          text: 'Millions remaining'
        },
        suggestedMin: 0
      }
    }
  };
  let filesTrendsData = {
    labels: dateArray,
    datasets: [{
        label: 'Total remaining to be verified',
        data: filesRemaining,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.1,
        segment: skippedSegment
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
          text: 'Millions remaining'
        },
        suggestedMin: 0
      }
    }
  };
  let objectsTrendsData = {
    labels: dateArray,
    datasets: [{
        label: 'Total remaining to be verified',
        data: objectsRemaining,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.1,
        segment: skippedSegment
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
  let objFailed = JSON.parse(failed_list);
  for(i=0;i<objFailed.length;i++){
    $("#objects-failed table tbody").append(
      '<tr><td>'+objFailed[i]['FailedItems']+'</td></tr>'
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
  let projection = (-b/m).toFixed(0)-(day);

  // calculate projected date of migration completion
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + projection);
  let dd = targetDate.getDate();
  let mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
  let yyyy = targetDate.getFullYear();

  var dateString = mm + "/" + dd + "/" + yyyy;

  $(".hl__projection").html(dateString + " (" + projection + " days away)");

  let bytesRegressionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Best fit regression",
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
        },
        suggestedMin: 0
      }
    }
  };
  let bytesRegressionData = {
    datasets: [{
        label: 'Data',
        data: bytesScatterArray,
        borderColor: lineColor,
        backgroundColor: lineColor,
        type: 'scatter'
    },{
        label: 'Linear regression: ' + equation,
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
  let bytesRegressionModal = $("#bytesRegressionModal");
  if (bytesRegressionModal) {
    new Chart(bytesRegressionModal, {
      type: 'scatter',
      data: bytesRegressionData,
      options: bytesRegressionOptions
    });
  }

  // aggregate data for chart view
  function createChartData(dataArray, newArray) {
    newArray.push(
      parseInt(dataArray[0])+parseInt(dataArray[1])+parseInt(dataArray[2])+parseInt(dataArray[3]),
      parseInt(dataArray[4]),
      parseInt(dataArray[5])+parseInt(dataArray[6]),
      parseInt(dataArray[7])
    );
    console.log(newArray);
  }

  // create tables
  function createTable(dataId, data, dataTotal, dataComplete){
    let $el = $(dataId);
    let dataTable = $el.find("tbody");

    // Pending group
    $(dataTable).append(
      '<tr><th colspan="2">Pending</th></tr>'
    );
    for(i=0;i<4;i++){
      $(dataTable).append(
        '<tr><td>'+tableLabels[i]+'</td><td>'+numberWithCommas(data[i])+'</td></tr>'
      );
    }

    // Migrated group
    $(dataTable).append(
      '<tr><th colspan="2">Migrated</th></tr><tr><td>'+tableLabels[4]+'</td><td>'+numberWithCommas(data[4])+'</td></tr><tr><th colspan="2">Failed migration</th></tr>'
    );

    // Failed migration group
    for(i=5;i<7;i++){
      $(dataTable).append(
        '<tr><td>'+tableLabels[i]+'</td><td>'+numberWithCommas(data[i])+'</td></tr>'
      );
    }

    // Verified group
    $(dataTable).append(
      '<tr><th colspan="2">Verified</th></tr><tr><td>'+tableLabels[7]+'</td><td>'+numberWithCommas(data[7])+'</td></tr>'
    );

    // Total calculations
    $(dataTable).append(
      '<tr><th colspan="2">Totals</th></tr><tr><td>Total</td><td>'+numberWithCommas(dataTotal)+'</td></tr><tr><td>% complete</td><td>'+dataComplete+'</td></tr>'
    );

    // Unrecoverable
    $el.append(
      '<p>*'+numberWithCommas(data[data.length-1])+' unrecoverable items will not be migrated</p>'
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
