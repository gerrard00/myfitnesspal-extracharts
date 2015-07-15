'use strict'

var gerrrard00 = gerrrard00 || {};
gerrrard00.charts = gerrrard00.charts || {};

gerrrard00.charts.ExponentiallySmoothedMovingAverageChart = (function () {
	'use strict';

	//TODO: if we switch to d3, we can probably have the chart run this calculation as part of the chart generation
	function calculateExponentialMovingAverage(currentObservation,
		previousExponentialMovingAverage) {

			//hacker diet suggests .9
			//TODO: make this configurable
			var smoothingFactor = .9;

			//interpretation of hacker diet: https://www.fourmilab.ch/hackdiet/www/subsubsection1_4_1_0_8_3.html
			return previousExponentialMovingAverage + 
				((1 - smoothingFactor) * 
					(currentObservation - previousExponentialMovingAverage));
	}

	function displayChart( displaySelector, data ) {
		console.log(data.length);
	}

	return { 
		displayChart : displayChart
	};
}());