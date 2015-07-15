'use strict';

(function() {
console.log('\'Allo \'Allo! Content script');

var displayDiv;

var existingChart = $('#highchart');

if (existingChart) {
	displayDiv = existingChart.after('<div id="extraCharts">gerrard</div>');
}

console.log('done now!')
}());

