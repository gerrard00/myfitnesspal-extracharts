'use strict';

(function() {
	console.log(gerrrard00);

	var loadService = gerrrard00.MyFitnessPalService;
	var chartDisplayer = gerrrard00.charts.ExponentiallySmoothedMovingAverageChart;

	var displayDiv;

	var existingChart = $('#highchart');

	//if the highcharts chart isn't there, we assume that we're on the wrong page (for now).
	if (existingChart) {
		displayDiv = existingChart.after('<div id="extraCharts"><label>Exponentially Smoothed Moving Average</label><div id="extraCharts_display" /></div>')[0];

		var data = loadService.getWeightData(function (data) {
		
			//TODO: magic string 
			chartDisplayer.displayChart('#extraCharts_display', data);

		}, function (error) {
			console.log("Error!" + error);
		});
	}
}());

