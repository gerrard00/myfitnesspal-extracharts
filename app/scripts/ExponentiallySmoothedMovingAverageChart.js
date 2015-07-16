'use strict';

/* global c3 */

var gerrard00 = gerrard00 || {};
gerrard00.charts = gerrard00.charts || {};

gerrard00.charts.ExponentiallySmoothedMovingAverageChart = (function () {
    var exponentialMovingAverageFieldName = 'exponentialMovingAverage';

    //TODO: if we switch to d3, we can probably have the chart run this calculation as part of the chart generation
    function calculateExponentialMovingAverage(currentObservation,
        previousExponentialMovingAverage) {

            //hacker diet suggests 0.9
            //TODO: make this configurable
            var smoothingFactor = 0.8;

            //inspired by hacker diet: 
            //https://www.fourmilab.ch/hackdiet/www/subsubsection1_4_1_0_8_3.html
            var result = previousExponentialMovingAverage +
                (
                    (1 - smoothingFactor) *
                    (currentObservation - previousExponentialMovingAverage)
                );

            //get two decimal places, toFixed returns string
            //TODO: this should really be just in c3 or d3 code
            result = Math.round(result * 100)/100;
            return result;
        }

    function displayChart( displaySelector, dataContainer ) {

        dataContainer.data.forEach(function (currentEntry, index, array) {

            
            currentEntry[exponentialMovingAverageFieldName] =
                //if we are seeing the first entry, use the current observation as the ema
                (index === 0) ? currentEntry.total
                //otherwise, use calculate the current ema using the previous value
                : calculateExponentialMovingAverage(currentEntry.total,
                    array[index - 1][exponentialMovingAverageFieldName]);

        });

        //TODO: instead of modifying data, copy the data to viewModel
        var viewModel = dataContainer.data;

        //TODO: figure out the ticks on the x axis

        var chart = c3.generate({
            bindto: displaySelector,
            data: {
                json: viewModel,
                keys: {
                    x: 'date',
                    value: ['total', exponentialMovingAverageFieldName]
                },
                type: 'line',
                types: {
                    exponentialMovingAverage: 'spline'
                },
                names: {
                    total: dataContainer.label,
                    exponentialMovingAverage: 'Smoothed'
                }
            },
            axis: {
                x: {
                    type: 'timeseries'
                }
            },
            tooltip: {
                grouped: false
            },
            point: {
                r: 5
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