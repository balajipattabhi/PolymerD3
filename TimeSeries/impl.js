function getSettings(){
    return {
        width:960,
        height:500,
        dataSrc:'data.tsv',
        xaxis:'xaxis',
        yaxis:'yaxis',
        xTimeParse:'%d-%b-%y'
    };
}

function fillSVG(mainsvg, config, data){
    if(config == null) config = getSettings();
    var svg = mainsvg,
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +config.width - margin.left - margin.right,
        height = +config.height  - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime;
    if(config.xTimeParse!='')
      parseTime = d3.timeParse(config.xTimeParse);

    var x = d3.scaleTime()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var line = d3.line()
      .x(function(d) {
        if(config.xTimeParse!='')
          return x(parseTime(d[config.xaxis]));
        else
          return x(d[config.xaxis]);
      })
      .y(function(d) { return y(+d[config.yaxis]); });

    x.domain(d3.extent(data, function(d) {
      if(config.xTimeParse!='')
        return parseTime(d[config.xaxis]);
      else
        return (d[config.xaxis]);
     }));
    y.domain(d3.extent(data, function(d) { return +d[config.yaxis]; }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(config.yaxis);

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}
