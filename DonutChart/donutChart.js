function donutChartDefaultSettings(){
    return {
        width:960,
        height:500,
        dataCSV:'data.csv',
        xaxis:'xaxis',
        yaxis:'yaxis',
        colors:["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
    };
}

function loadDonutChart(mainsvg, config){

  var width = config.width,
      height = config.height,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(config.colors);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d[config.yaxis]; });

  var svg = mainsvg
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv(config.dataCSV, function(d){
      d[config.yaxis] =+d[config.yaxis];
      return d;
    },
    function(error, data) {
      if (error) throw error;
      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data[config.xaxis]); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data[config.xaxis]; });
    });
}
