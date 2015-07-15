'use strict';

(function() {
	console.log(gerrrard00);
	
	var loadService = gerrrard00.MyFitnessPalService;
	var chartDisplayer = gerrrard00.charts.ExponentiallySmoothedMovingAverageChart;

	var displayDiv;

	var existingChart = $('#highchart');

	//if the highcharts chart isn't there, we assume that we're on the wrong page (for now).
	if (existingChart) {
		displayDiv = existingChart.after('<div id="extraCharts">gerrard</div>');

		var data = loadService.getWeightData(function (data) {
		
			chartDisplayer.displayChart(displayDiv, data);

		}, function (error) {
			console.log("Error!" + error);
		});
	}

	console.log('done now!')
}());

