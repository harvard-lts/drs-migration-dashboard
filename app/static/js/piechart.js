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
      let data = JSON.parse(this.responseText);

      let i = data.length - 1; // last updated row

      let date = data[i]["Date"];
      let time = data[i]["Time"];

      $(".hl__date").html(date);
      $(".hl__time").html(time);

      let bytes_data = [
        data[i]["PendingBytes"], //pending
        data[i]["In ProcessBytes"],  // in process
        data[i]["FailureBytes"],  // failure
        data[i]["UnrecoverableBytes"],  // unrecoverable
        data[i]["SensitiveBytes"],  // sensitive
        data[i]["On holdBytes"],  // on hold
        data[i]["Needs verificationBytes"],  // success
        data[i]["VerifiedBytes"],  // verified
        data[i]["Verify failedBytes"]   // verified failed
      ];

      let bytes_total = data[i]["TotalBytes"]; // total
      let bytes_percent_complete = data[i]["% CompleteBytes"]; // % complete

      let files_data = [
        data[i]["PendingFiles"], //pending
        data[i]["In ProcessFiles"],  // in process
        data[i]["FailureFiles"],  // failure
        data[i]["UnrecoverableFiles"],  // unrecoverable
        data[i]["SensitiveFiles"],  // sensitive
        data[i]["On holdFiles"],  // on hold
        data[i]["Needs verificationFiles"],  // success
        data[i]["VerifiedFiles"],  // verified
        data[i]["Verify failedFiles"]   // verified failed
      ];

      let files_total = data[i]["TotalFiles"]; // total
      let files_percent_complete = data[i]["% CompleteFiles"]; // % complete

      let objects_data = [
        data[i]["PendingObject"], //pending
        data[i]["In ProcessObject"],  // in process
        data[i]["FailureObject"],  // failure
        data[i]["UnrecoverableObject"],  // unrecoverable
        data[i]["SensitiveObject"],  // sensitive
        data[i]["On holdObject"],  // on hold
        data[i]["Needs verificationObject"],  // success
        data[i]["VerifiedObject"],  // verified
        data[i]["Verify failedObject"]   // verified failed
      ];

      let objects_total = data[i]["TotalObject"]; // total
      let objects_percent_complete = data[i]["% CompleteObject"]; // % complete

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
            hoverBackgroundColor: colors.slice(0,7),
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
            hoverBackgroundColor: colors.slice(0,7),
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
        dateArray.push(data[i]["Date"]); // array of dates for x-axis

        calcRemaining(bytesRemaining, data[i]["TotalBytes"], data[i]["VerifiedBytes"], 12);

        calcRemaining(filesRemaining, data[i]["TotalFiles"], data[i]["VerifiedFiles"], 6);

        calcRemaining(objectsRemaining, data[i]["TotalObject"], data[i]["VerifiedObject"], 3);
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


      // list of object ids for object
      let xmlhttp2 = new XMLHttpRequest();
      xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let objFailed = JSON.parse(this.responseText);
          for(i=0;i<objFailed.length;i++){
            $("#objects-failed table tbody").append(
              '<tr><td>'+FailedIDs[i]+'</td></tr>'
            );
          }
        }
      }
    }
  };

  xmlhttp.open(
    "GET",
    "https://localhost:3001/migrationstatus/static/files/drs_migration.json",
    true
  );
  xmlhttp.send();

  xmlhttp2.open(
    "GET",
    "https://localhost:3001/migrationstatus/static/files/failed_list.json",
    true
  );
  xmlhttp2.send();

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
