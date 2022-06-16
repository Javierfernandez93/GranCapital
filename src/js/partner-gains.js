$(document).ready(function(){
    let gains = new Gains;

    Chart.defaults.global.defaultFontFamily = 'OpenSans';
    Chart.defaults.global.defaultFontColor = '#858796';

    dinamicLoader.showLoader($("#response"));

    gains.getGains((response)=>{
        if(response.s == 1)
        {
            $("#response").html(response.html);
            
            loadChartData(response.labels,response.data,response.currency);
        }
    });

    window.getMethodsToShareReferrealLink = function(element)
    {
      _showLeftAlertWS('getMethodsToShareReferrealLink',null,{} ,element,'preloader-sm-black')
    }

    function loadChartData(labels,data,currency)
    {  
        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: "Ganancias",
              lineTension: 0.1,
              borderWidth: 2, 
              backgroundColor: "#d1f2ec",
              borderColor: "#70c0aa",
              pointRadius: 0,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#ff5e00",
              pointHoverBorderColor: "#ff5e00",
              pointHitRadius: 10,
              pointBorderWidth: 0,
              data: data,
            }],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            scales: {
              xAxes: [{
                time: {
                  unit: 'date'
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  padding: 0,
                  maxTicksLimit: 4,
                  maxRotation: 0,
                  minRotation: 0
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  maxTicksLimit: 6,
                  padding: 0,
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    return '$' + number_format(value);
                  }
                },
                gridLines: {
                  color: "rgba(234, 236, 244,0)",
                  zeroLineColor: "rgba(234, 236, 244,0)",
                  drawBorder: false,
                  borderDash: [0],
                  zeroLineBorderDash: [0]
                }
              }],
            },
            legend: {
              display: false
            },
            tooltips: {
              backgroundColor: "#222",
              bodyFontSize: 22,
              bodyFontColor: "#fff",
              titleMarginBottom: 10,
              titleFontColor: '#fff',
              titleFontSize: 18,
              borderColor: '#333',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              intersect: false,
              mode: 'index',
              caretPadding: 10,
              callbacks: {
                label: function(tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + ' $' + number_format(tooltipItem.yLabel,2)+ ' '+currency;
                }
              }
            }
          }
        });
    }
});

class Gains extends Http {
	constructor() {
		super();
	}
	getGains(callback,data){
    	return this.call("../../app/application/get_gains.php",data,callback);
	}
}