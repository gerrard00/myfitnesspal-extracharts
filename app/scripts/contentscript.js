(function() {
    'use strict';

    /* global $, gerrard00 */

    var loadService = gerrard00.MyFitnessPalService;
    var chartDisplayer = gerrard00.charts.ExponentiallySmoothedMovingAverageChart;

    var displayDiv;
    var currentlyLoadedUrl;

    //TODO: magic string
    var existingChart = $('#highchart');

    //if the highcharts chart isn't there, we assume that we're on the wrong page (for now).
    if (existingChart) {
        displayDiv = existingChart
            //TODO: store this HTML in a file
            //TODO: get rid of the line styles
            .after('<div id="extraCharts" style="margin: 50px 0px 0px 0px;"><div class="extraChartsTitle" text-anchor="middle" zIndex="4">Exponentially Smoothed Average</div><div id="extraCharts_display" /></div>')[0];
    }

    chrome.runtime.onMessage.addListener(function(request) {
        //console.log('Got a message from background!');
        
        if (request.url && request.url !== currentlyLoadedUrl)
        {
            //console.log('New url:' + request.url);

            currentlyLoadedUrl = request.url;

            loadService.getWeightData(request.url, function (dataObject) {
            
                try {
                    //TODO: magic string 
                    chartDisplayer.displayChart('#extraCharts_display', dataObject);
                }
                catch(err) {
                    console.log('Error loading chart: ' + err.message);
                }
            }, function (error) {
                //TODO: notify the user
                console.log('Error!' + error);
            });
        }
        
    });
}());

