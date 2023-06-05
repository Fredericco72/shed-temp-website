// set the dimensions and margins of the graph
// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

const x_scale = d3.scaleTime().range([0, width]);
const y_scale = d3.scaleLinear().range([height, 0]);

const parseTime = d3.timeParse("%s");

d3
	.json("https://shedtemp.pythonanywhere.com/data")
	.then((response) => {
	    // Get the data and format the datetime
	    var data = response.data;
		data.forEach(function(d){ d.datetime = new Date(d.datetime * 1000) });

		// Scale the range of the data in the domains
		x_scale.domain(d3.extent(data, function(d) { return d.datetime; }));
		y_scale.domain([0, d3.max(data, d => +d.avg_cpu_temp)]);

		// Add X axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x_scale));

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y_scale));

		svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                .x(function(d) { return x_scale(d.datetime) })
                .y(function(d) { return y_scale(d.avg_cpu_temp) })
            )

		svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x_scale(d.datetime) })
                .y(function(d) { return y_scale(d.adj_temp) })
            )

		svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                .x(function(d) { return x_scale(d.datetime) })
                .y(function(d) { return y_scale(d.raw_temp) })
            )

	})
	.catch((d) => console.log(d));