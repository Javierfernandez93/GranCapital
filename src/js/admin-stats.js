$(document).ready(function(){  
  let stats = new Stats;

  getLastStats($("#default-loader"));
  
  window.getLastStatsFilter = function() 
  {
    if($("#start_date").val() && $("#end_date").val())
    {
      getLastStats($("#default-loader"));
    }
  }

  function getLastStats(element) 
  {
    dinamicLoader.show(element);
    
    $("#chart-container").addClass("d-none");
    
    stats.getLastStats((response)=>{  
      dinamicLoader.close();
      
      if(response.s == 1) {
        $("#response").html(response.html)
      
        runStats(response.title,response.series,response.data,response.categories);

        if(response.data)
        {
          $("#chart-container").removeClass("d-none");
        }
      }
    },{start_date:$("#start_date").val(),end_date:$("#end_date").val()});
  }
    
  function runStats(title,series,data,categories)
  {
     var options = {
        chart: {
          type:"area",
          height : 232,
          sparkline:{
            enabled: true
          }
        },
        series : [
          {
            data: data
          }
        ],
        xaxis: {
          floating: true,
          categories: categories,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$"+number_format(value,2);
            }
          },
        },
        stroke:{
          curve:"smooth",
          width:2
        },
        colors:["#3c57ff"],
        tooltip:{
          fixed:{
            enabled : false
          },
          x:{
            show: true
          },
          y:{
            title: {
              formatter: function (e) { return "Balance $"
            }
          }
        },
        marker:{show:!1}
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
});

class Stats extends Http {
  constructor()
  {
    super();
  }
  getLastStats(callback,data){
    return this.call('../../app/application/get_last_stats.php',data,callback,false);
  }
};