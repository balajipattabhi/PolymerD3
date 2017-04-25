

function getSettings(){

    var processFn = function (d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
            return d;
    }

    return {
        width:960,
        height:500,
        dataSrc:'dataStackedArea.csv',
        processFn:processFn,
        xaxis:'xaxis',
        yaxis:'yaxis',
        xTimeParse:'%Y %b %d'
    };
}

function fillSVGSArea(mainsvg, config, data){
    if(config == null) config = getSettings();
    var svg = mainsvg,
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +config.width - margin.left - margin.right,
        height = +config.height  - margin.top - margin.bottom;

    var parseTime;
    var x;
    if(config.xTimeParse!=''){
      parseTime = d3.timeParse(config.xTimeParse);
       x = d3.scaleTime()
      .rangeRound([0, width]);
    }
    else{
        x = d3.scaleLinear()
        .rangeRound([0, width]);
    }



    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var stack = d3.stack();

    var area = d3.area()
    .x(function(d, i) {
        if(config.xTimeParse!='')
             return x(parseTime(d.data[config.xaxis]));
        else
             return x(d.data[config.xaxis]);
    })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });




    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var keys = data.columns.slice(1);

    x.domain(d3.extent(data, function(d) {
        if(config.xTimeParse!='')
             return parseTime(d[config.xaxis]);
        else
             return d[config.xaxis];

    }));

    z.domain(keys);
    stack.keys(keys);

    var layer = g.selectAll(".layer")
    .data(stack(data))
    .enter().append("g")
      .attr("class", "layer");

    layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) { return z(d.key); })
      .attr("d", area);

    layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    .append("text")
      .attr("x", width - 6)
      .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
      .attr("dy", ".35em")
      .style("font", "10px sans-serif")
      .style("text-anchor", "end")
      .text(function(d) { return d.key; });

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));
    }
