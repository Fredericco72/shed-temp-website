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
	})
	.catch((d) => console.log(d));