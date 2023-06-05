// set the dimensions and margins of the graph
const width = 960,
	height = 500;
const svg = d3.select("#d3_demo").attr("width", width).attr("height", height);

const x_scale = d3.scaleBand().range([0, width]).padding(0.1);
const y_scale = d3.scaleLinear().range([height, 0]);

console.log("Hello");

d3
	.json("https://shedtemp.pythonanywhere.com/data")
	.then((data) => {
		console.log("world");
		console.log(data);

		// Scale the range of the data in the domains
		x_scale.domain(d3.extent(data.data, d => d.datetime));
		y_scale.domain([0, d3.max(data.data, d => d.avg_cpu_temp)]);

		// append the rectangles for the bar chart
		svg
			.selectAll("rect")
			.data(data.data)
			.join("rect")
			.attr("class", "bar")
			.attr("x", (d) => x_scale(d.datetime))
			.attr("y", (d) => y_scale(d.avg_cpu_temp))
			.attr("width", x_scale.bandwidth())
			.attr("height", (d) => height - y_scale(d.avg_cpu_temp));
	})
	.catch((d) => console.log(d));