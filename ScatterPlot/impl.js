function getSettings(){

    var processFn = function(d) {
      return d;
    };

    return {
        width:960,
        height:500,
        processFn:processFn,
        xaxis:'xaxis',
        yaxis:'yaxis',
        series:'series',
        dataSrc:'dataScatter.csv'
    };
}

function fillSVGScatter(mainsvg, config, data){

    if(config == null) config = getSettings();


    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = config.width - margin.left - margin.right,
        height = config.height - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);



    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y);



    var svg = mainsvg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      d[config.yaxis] = +d[config.yaxis];
      d[config.xaxis] = +d[config.xaxis];
    });

    x.domain(d3.extent(data, function(d) { return d[config.xaxis]; })).nice();
    y.domain(d3.extent(data, function(d) { return d[config.yaxis]; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sepal Length (cm)")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[config.xaxis]); })
        .attr("cy", function(d) { return y(d[config.yaxis]); })
        .style("fill", function(d) { return color(d[config.series]); });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width+50)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width+40)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

}
