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
  let colors = ['#c0c0c0','#f8c21c','#a51c30','#eb001b','#414141','#0579b8','#3e6f7d','green','red'];
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
        data[i]["gsx$bybytes"]["$t"],
        data[i]["gsx$_cre1l"]["$t"],
        data[i]["gsx$_chk2m"]["$t"],
        data[i]["gsx$_ciyn3"]["$t"],
        data[i]["gsx$_ckd7g"]["$t"],
        data[i]["gsx$_clrrx"]["$t"],
        data[i]["gsx$_cyevm"]["$t"],
        data[i]["gsx$_cztg3"]["$t"],
        data[i]["gsx$_d180g"]["$t"]
      ];

      let bytes_total = data[i]["gsx$_d2mkx"]["$t"];
      let bytes_percent_complete = data[i]["gsx$_cssly"]["$t"];

      let files_data = [
        data[i]["gsx$byfiles"]["$t"],
        data[i]["gsx$_cvlqs"]["$t"],
        data[i]["gsx$_cx0b9"]["$t"],
        data[i]["gsx$_d9ney"]["$t"],
        data[i]["gsx$_db1zf"]["$t"],
        data[i]["gsx$_dcgjs"]["$t"],
        data[i]["gsx$_ddv49"]["$t"],
        data[i]["gsx$_d415a"]["$t"],
        data[i]["gsx$_d5fpr"]["$t"]
      ];

      let files_total = data[i]["gsx$_d6ua4"]["$t"];
      let files_percent_complete = data[i]["gsx$_d88ul"]["$t"];

      let objects_data = [
        data[i]["gsx$byobjects"]["$t"],
        data[i]["gsx$_dmair"]["$t"],
        data[i]["gsx$_dnp34"]["$t"],
        data[i]["gsx$_dp3nl"]["$t"],
        data[i]["gsx$_df9om"]["$t"],
        data[i]["gsx$_dgo93"]["$t"],
        data[i]["gsx$_di2tg"]["$t"],
        data[i]["gsx$_djhdx"]["$t"],
        data[i]["gsx$_dw4je"]["$t"]
      ];

      let objects_total = data[i]["gsx$_dxj3v"]["$t"];
      let objects_percent_complete = data[i]["gsx$_dyxo8"]["$t"];

      console.log(bytes_data);
      console.log(files_data);
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
              bottom:10
            }
          }
        }
      };
      let bytesChartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
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
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
            data: files_data
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
        labels: labels,
        datasets: [
          {
            backgroundColor: colors.slice(0,9),
            borderWidth: 1,
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

      // table views
      createTable("#bytes-numbers", bytes_data, bytes_total, bytes_percent_complete);
      createTable("#files-numbers", files_data, files_total, files_percent_complete);
      createTable("#objects-numbers", objects_data, objects_total, objects_percent_complete);
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
        '<tr><td>'+labels[i]+'</td><td>'+numberWithCommas(data[i])+'</dt></tr>'
      );
    }
    $(dataTable).append(
      '<tr><td>Total</td><td>'+numberWithCommas(dataTotal)+'</dt></tr><tr><td>% complete</td><td>'+dataComplete+'</dt></tr>'
    );
  }

  // add commas to numbers in table view
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
});
