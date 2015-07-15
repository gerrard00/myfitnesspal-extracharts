'use strict';

(function() {
console.log('\'Allo \'Allo! Content script');

var displayDiv;

var existingChart = $('#highchart');

//if the highcharts chart isn't there, we assume that we're on the wrong page (for now).
if (existingChart) {

	displayDiv = existingChart.after('<div id="extraCharts">gerrard</div>');

	var data = gerrrard00.MyFitnessPalService.getWeightData(function (data) {
		console.log(data[0]);
	}, function (error) {
		console.log("Error!" + error);
	});
}

console.log('done now!')
}());

