function getSettings(){

    var processFn = function(d) {
      return d;
    };

    return {
        width:960,
        height:500,
        dataSrc:'dataPieChart.csv',
        processFn:processFn,
        xaxis:'xaxis',
        yaxis:'yaxis',
        colors:["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
    };
}

function fillSVG(mainsvg, config, data){
 if(config == null) config = getSettings();
  var width = config.width,
      height = config.height,
      radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
      .range(config.colors);

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d[config.yaxis]; });

  var svg = mainsvg
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data[config.xaxis]); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data[config.xaxis]; });




}
