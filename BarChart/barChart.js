function barChartDefaultSettings(){
    return {
        width:960,
        height:500,
        dataSrc:'data.tsv',
        xaxis:'xaxis',
        yaxis:'yaxis'
    };
}

function loadBarChart(mainsvg, config, data){

    var svg = mainsvg,
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = + config.width - margin.left - margin.right,
      height = + config.height - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d[config.xaxis] }));
    y.domain([0, d3.max(data, function(d) { return d[config.yaxis] })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d[config.xaxis]); })
        .attr("y", function(d) { return y(d[config.yaxis]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[config.yaxis]); });

}
