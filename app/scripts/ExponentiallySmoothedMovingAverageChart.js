'use strict'

var gerrrard00 = gerrrard00 || {};
gerrrard00.charts = gerrrard00.charts || {};

gerrrard00.charts.ExponentiallySmoothedMovingAverageChart = (function () {
	var exponentialMovingAverageFieldName = "exponentialMovingAverage";

	//TODO: if we switch to d3, we can probably have the chart run this calculation as part of the chart generation
	function calculateExponentialMovingAverage(currentObservation,
		previousExponentialMovingAverage) {

			//hacker diet suggests .9
			//TODO: make this configurable
			var smoothingFactor = .9;

			//inspired by hacker diet: 
			//https://www.fourmilab.ch/hackdiet/www/subsubsection1_4_1_0_8_3.html
			return previousExponentialMovingAverage + 
				((1 - smoothingFactor) * 
					(currentObservation - previousExponentialMovingAverage));
	}

	function displayChart( displaySelector, data ) {

		data.forEach(function (currentEntry, index, array) {

			//if we are seeing the first entry...
			currentEntry[exponentialMovingAverageFieldName] = (index === 0)
			//use the current observation as the ema
		    ? currentEntry.total
		    //otherwise, use calculate the current ema using the previous value
		    : calculateExponentialMovingAverage(currentEntry.total, 
		    	array[index - 1][exponentialMovingAverageFieldName]);

  		});

		//TODO: instead of modifying data, copy the data to viewModel
		var viewModel = data;

		//TODO: figure out the ticks on the x axis
		//TODO: why aren't tooltips working?
		//TODO: scatter for the real values? Default scatter has tiny points.
		console.log(displaySelector);

		var chart = c3.generate({
			bindto: displaySelector,
			data: {
			    json: viewModel,
			    keys: {
			        x: 'date',
			        value: ['total', exponentialMovingAverageFieldName]
			    },
			    types : {
			      total : 'line'
			    }
			},
			axis: {
			    x: {
			        type: 'timeseries'
			    }
			}
		});

		//TODO: add a real legend

		console.log('finished generating chart');

		return chart;
	}

	return { 
		displayChart : displayChart
	};
}());