'use strict';

(function() {
	var loadService = gerrrard00.MyFitnessPalService;
	var chartDisplayer = gerrrard00.charts.ExponentiallySmoothedMovingAverageChart;

	var displayDiv;
	var currentlyLoadedUrl;

	//TODO: magic string
	var existingChart = $('#highchart');

	//if the highcharts chart isn't there, we assume that we're on the wrong page (for now).
	if (existingChart) {
		displayDiv = existingChart
			//TODO: store this HTML in a file
			//TODO: get rid of the line styles
			.after('<div id="extraCharts" style="margin: 50px 0px 0px 0px;"><div style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Verdana, Arial, Helvetica, sans-serif;font-size:26px;color:#274b6d;fill:#274b6d;text-align: center;" text-anchor="middle" zIndex="4">Exponentially Smoothed Average Weight</div><div id="extraCharts_display" /></div>')[0];
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		console.log('Got a message from background!');
		
		if (request.url && request.url != currentlyLoadedUrl)
		{
			loadService.getWeightData(request.url, function (data) {
			
				//TODO: magic string 
				chartDisplayer.displayChart('#extraCharts_display', data);
				
				currentlyLoadedUrl = request.url;

			}, function (error) {
				console.log("Error!" + error);
			});	
		}
		
	});
}());

